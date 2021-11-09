module.exports = {
    siteMetadata: {
        siteUrl: "https://dodotracker.com",
        title: "Dodo Tracker",
        description:
            "Dodo Tracker is a tool for tracking, analyzing, and predicting villager encounter rates across the game Animal Crossing: New Horizons.",
        author: "@peebun",
    },
    plugins: [
        "gatsby-plugin-cname",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-top-layout",
        {
            resolve: "gatsby-plugin-material-ui",
            options: {
                stylesProvider: {
                    injectFirst: true,
                },
            },
        },
        "gatsby-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: "Dodo Tracker (Animal Crossing: New Horizons)",
                short_name: "Dodo Tracker",
                start_url: "/",
                background_color: "#1591d1",
                theme_color: "#1591d1",
                display: "minimal-ui",
                icon: "src/images/favicon.png",
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
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-33841871-4",
            },
        },
    ],
};
