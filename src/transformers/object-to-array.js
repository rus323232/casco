export default (object) => {
  if (object instanceof Object) {
    return Object.keys(object).map(key => object[key]);
  }
  return object;
};
