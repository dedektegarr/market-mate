const transformErrors = (errors) => {
  const transformedErrors = {};

  errors.forEach((error) => {
    const { msg, path } = error;
    transformedErrors[path] = msg;
  });

  return transformedErrors;
};

export { transformErrors };
