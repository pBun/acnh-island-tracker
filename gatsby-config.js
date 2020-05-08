module.exports = {
    pathPrefix: `/acnh-island-tracker`,
    siteMetadata: {
        title: `Mystery Island Tracker`,
        description: `Track villager sightings on Animal Crossing New Horizon Mystery Islands.`,
        author: `@peebun`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        'gatsby-plugin-material-ui',
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
          resolve: `gatsby-plugin-manifest`,
          options: {
            name: `island-tracker`,
            short_name: `tracker`,
            start_url: `/`,
            background_color: `#3f51b5`,
            theme_color: `#3f51b5`,
            display: `minimal-ui`,
          },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
