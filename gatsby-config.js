module.exports = {
    siteMetadata: {
        title: `Dodo Tracker`,
        description: `This is a tool for tracking and comparing villager spawns on both mystery islands and the campsite within the game Animal Crossing: New Horizon. Raymond for everyone!`,
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
                name: `Dodo Tracker (Animal Crossing: New Horizons)`,
                short_name: `Dodo Tracker`,
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
