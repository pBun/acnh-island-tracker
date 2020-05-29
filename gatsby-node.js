/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const VILLAGERS = require("./src/data/villagers");

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;
    VILLAGERS.forEach(villager => {
        createPage({
            path: `/villagers/${villager.id}/`,
            matchPath: `/villagers/${villager.id}/`,
            component: path.resolve('src/components/VillagerDetailsPage.js'),
            context: {
                villagerId: villager.id,
            },
        });
    });
}
