export function percentToString(fraction, base=1000) {
    return `${(Math.round(fraction * 10000) / 100).toFixed(2)}%`;
}
export default {
    percentToString,
};
