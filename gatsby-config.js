module.exports = {
    siteMetadata: {
        title: `Pathfinder`,
        description: `A Minimum Spanning Tree (MST) Pathfinding Visualizer.`,
        author: `@ezralazuardyy`
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-image`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Pathfinder`,
                short_name: `Pathfinder`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#673ab7`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`
            }
        },
        `gatsby-plugin-gatsby-cloud`
    ]
}
