export const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};
