export const sortData = (data, key, order) => {
  if (!key || !order) return data;
  return [...data].sort((a, b) => {
    const valA = a[key].toString().toLowerCase();
    const valB = b[key].toString().toLowerCase();
    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });
};
