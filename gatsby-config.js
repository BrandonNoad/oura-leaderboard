'use strict';

const Proxy = require('http-proxy-middleware');

module.exports = {
    siteMetadata: {
        title: `Oura Leaderboard`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@gatsbyjs`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#64e7ec`,
                theme_color: `#64e7ec`,
                display: `minimal-ui`,
                icon: `src/images/OURA_Symbol_Black_RGB.png` // This path is relative to the root of the site.
            }
        },
        {
            resolve: `gatsby-plugin-create-client-paths`,
            options: { prefixes: [`/app/*`] }
        },
        `gatsby-plugin-emotion`
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        // 'gatsby-plugin-offline',
    ],
    // For avoiding CORS while developing Netlify Functions locally read more:
    // https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
    developMiddleware: (app) => {
        app.use(
            '/.netlify/functions/',
            Proxy({
                target: 'http://localhost:9000',
                pathRewrite: {
                    '/.netlify/functions/': ''
                }
            })
        );
    }
};
