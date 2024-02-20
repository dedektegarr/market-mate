export const accountValidationSchema = {
  name: {
    notEmpty: true,
    errorMessage: "Name is required",
  },
  email: {
    notEmpty: true,
    errorMessage: "Email is required",
    isEmail: true,
    errorMessage: "Invalid email address",
  },
  password: {
    notEmpty: true,
    errorMessage: "Password is required",
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters",
    },
  },
};
