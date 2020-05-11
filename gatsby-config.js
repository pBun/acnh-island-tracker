module.exports = {
    pathPrefix: `/acnh-island-tracker`,
    siteMetadata: {
        title: `Mystery Island Tracker for ACNH`,
        description: `This is a tool for tracking and comparing villager appearances on Mystery Islands within the game Animal Crossing: New Horizon. Let's demystify the magic; Raymond for everyone!`,
        author: `@peebun`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        "gatsby-plugin-top-layout",
        {
            resolve: "gatsby-plugin-material-ui",
            options: {
                stylesProvider: {
                    injectFirst: true,
                },
            },
        },
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `ACNH Island Tracker`,
                short_name: `Island Tracker`,
                start_url: `/`,
                background_color: `#1591d1`,
                theme_color: `#1591d1`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`,
                icons: [
                    {
                        src: "/favicons/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/favicons/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
