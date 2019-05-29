'use strict';

const path = require('path');

// If .env.development is missing (e.g production), this will fail silently.
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.development') });

const Boom = require('@hapi/boom');
const Joi = require('joi');
const Axios = require('axios');

exports.handler = async (event, context) => {
    try {
        // -- Check HTTP method.

        if (event.httpMethod !== 'POST') {
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

        const payloadSchema = Joi.object({
            projectName: Joi.string()
                .trim()
                .required(),
            purpose: Joi.string()
                .trim()
                .required(),
            outcome: Joi.string()
                .trim()
                .required(),
            brainstorming: Joi.string()
                .trim()
                .allow('')
                .default(''),
            nextAction: Joi.string()
                .trim()
                .allow('')
                .default('')
        });

        const { error, value: postPayload } = Joi.validate(event.body, payloadSchema);

        if (error !== null) {
            throw Boom.boomify(error, { statusCode: 400 });
        }

        return {
            statusCode: 200,
            body: JSON.stringify(null)
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
