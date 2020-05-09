module.exports = {
    pathPrefix: `/acnh-island-tracker`,
    siteMetadata: {
        title: `ACNH Island Tracker`,
        description: `Island Tracker is a tool to track and compare villager appearances for Animal Crossing: New Horizon's new feature, Mystery Islands. Let's demystify the magic; Raymond for everyone!`,
        author: `@peebun`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        'gatsby-plugin-material-ui',
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
            background_color: `#3f51b5`,
            theme_color: `#3f51b5`,
            display: `minimal-ui`,
            icon: `src/images/favicon.png`,
            icons: [
                {
                    src: "/favicons/android-chrome-192x192.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "/favicons/android-chrome-512x512.png",
                    sizes: "512x512",
                    type: "image/png"
                }
            ],
          },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
