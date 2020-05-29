import { useStaticQuery, graphql } from "gatsby";

export default function useVillagerIcons() {
    const { allImageSharp } = useStaticQuery(
        graphql`
            query {
                allImageSharp {
                    nodes {
                        resize(width: 40) {
                            src
                            originalName
                        }
                    }
                }
            }
        `
    );
    const villagerIcons = {};
    allImageSharp.nodes.forEach(node => {
        villagerIcons[node.resize.originalName.replace(".png", "")] = node.resize.src;
    });
    return villagerIcons;
}
