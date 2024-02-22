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

const checkPassword = async(password, hashedPassword) => {
  try {
    const passwordCorrect = await bcrypt.compare(password, hashedPassword);
    return passwordCorrect;
  } catch (error) {
    console.log(error)
  }
}

export { hashPassword, checkPassword };
