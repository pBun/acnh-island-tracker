export function groupBy(list, field) {
    if (!list || !field) return;
    return list.reduce((acc, data) => {
        (acc[data[field]] = acc[data[field]] || []).push(data);
        return acc;
    }, {});
}
