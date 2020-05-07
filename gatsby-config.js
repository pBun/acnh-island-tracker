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
        {
          resolve: `gatsby-source-filesystem`,
          options: {
            name: `images`,
            path: `${__dirname}/src/images`,
          },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
          resolve: `gatsby-plugin-manifest`,
          options: {
            name: `gatsby-starter-default`,
            short_name: `starter`,
            start_url: `/`,
            background_color: `#663399`,
            theme_color: `#663399`,
            display: `minimal-ui`,
          },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
