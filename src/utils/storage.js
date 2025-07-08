export const saveState = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getState = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
