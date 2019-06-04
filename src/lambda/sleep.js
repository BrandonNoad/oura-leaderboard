'use strict';

const path = require('path');

// If .env.development is missing (e.g production), this will fail silently.
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.development') });

const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const Axios = require('axios');
const Airtable = require('airtable');

exports.handler = async (event, context) => {
    try {
        // -- Check HTTP method.

        if (event.httpMethod !== 'GET') {
            throw Boom.methodNotAllowed();
        }

        // -- Check auth.

        // The user object is present if the function request has an Authorization: Bearer <token>
        // header with a valid JWT from the Identity instance. In this case the object will contain
        // the decoded claims.
        const { user } = context.clientContext;

        if (user === undefined) {
            throw Boom.unauthorized(undefined, 'Bearer');
        }

        // -- Validate payload.

        const querySchema = Joi.object({
            // use .raw() instead of .options({ convert: false })
            // https://github.com/hapijs/joi/issues/762
            date: Joi.date()
                .format('YYYY-MM-DD')
                .required()
                .raw(),
            accessToken: Joi.string()
                .token()
                .required()
        });

        const { error, value: query } = Joi.validate(event.queryStringParameters, querySchema);

        if (error !== null) {
            throw Boom.boomify(error, { statusCode: 400 });
        }

        const { data } = await Axios.get(`https://api.ouraring.com/v1/userinfo`, {
            headers: { Authorization: `Bearer ${query.accessToken}` }
        });

        const emailForUser = user.email.toLowerCase();

        if (data.email.toLowerCase() !== emailForUser) {
            throw Boom.badRequest('Invalid email');
        }

        const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
            process.env.AIRTABLE_API_BASE_ID
        );

        const resultToApi = (result) => ({
            email: result.fields.email,
            date: result.fields.date,
            data: JSON.parse(result.fields.data)
        });

        const results = (await base('sleep')
            .select({
                filterByFormula: `DATESTR({date}) = '${query.date}'`
            })
            .firstPage()).map(resultToApi);

        const isResultForUser = !!results.find(({ email }) => email.toLowerCase() === emailForUser);

        if (!isResultForUser) {
            const { data } = await Axios.get(`https://api.ouraring.com/v1/sleep`, {
                headers: { Authorization: `Bearer ${query.accessToken}` },
                params: { start: query.date, end: query.date }
            });

            // Is there a difference between hasn't sync'd yet vs no sleep data (ring dead, forgot
            // to wear it, etc.).

            if (data.sleep.length) {
                const result = await base('sleep').create({
                    email: user.email,
                    date: query.date,
                    data: JSON.stringify(data.sleep[0])
                });

                results.push(resultToApi(result));
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(results)
        };
    } catch (err) {
        if (Boom.isBoom(err)) {
            return {
                statusCode: err.output.statusCode,
                body: JSON.stringify(err.output.payload)
            };
        }

        // Re-throw error.
        throw err;
    }
};
