import { useStaticQuery, graphql } from "gatsby";

export default function useVillagerIcons() {
    const villagerIconsQuery = useStaticQuery(
        graphql`
            query {
                allFile(filter: { relativeDirectory: { eq: "villager-icons" } }) {
                    edges {
                        node {
                            publicURL
                            name
                        }
                    }
                }
            }
        `
    );
    const villagerIcons = {};
    villagerIconsQuery.allFile.edges.forEach(edge => {
        villagerIcons[edge.node.name] = edge.node.publicURL;
    });
    return villagerIcons;
}
