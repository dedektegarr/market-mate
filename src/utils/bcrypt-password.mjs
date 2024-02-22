import bcrypt from "bcrypt";

const salt = 10;

const hashPassword = async (password) => {
  try {
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export { hashPassword };
