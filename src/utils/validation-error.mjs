const errorArrayToObject = (errArray) => {
  const errors = {};

  errArray.forEach((err) => {
    errors[err.path] = err.msg;
  });

  return errors;
};

export { errorArrayToObject };
