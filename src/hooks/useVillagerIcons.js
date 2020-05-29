import { useStaticQuery, graphql } from "gatsby";

export default function useVillagerIcons() {
    const villagerIconsQuery = useStaticQuery(
        graphql`
            query {
                allImageSharp {
                    nodes {
                        id
                        original {
                            width
                            height
                            src
                        }
                        fixed(width: 40) {
                            src
                            srcWebp
                            originalName
                        }
                    }
                }
            }
        `
    );
    const villagerIcons = {};
    villagerIconsQuery.allImageSharp.nodes.forEach(node => {
        villagerIcons[node.fixed.originalName.replace(".png", "")] = node.fixed.src;
    });
    return villagerIcons;
}
