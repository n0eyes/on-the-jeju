const createQuery = (options: { [index: string]: string | number }) => {
  return Object.keys(options)
    .map((key) => `${key}=${options[key]}`)
    .join("&");
};

export default createQuery;
