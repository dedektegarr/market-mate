import { body, validationResult } from "express-validator";
import Account from "../models/account.mjs";
import { hashPassword } from "../utils/bcrypt-password.mjs";
import User from "../models/Users.mjs";

const accountController = {
  validateSignup: [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isString()
      .withMessage("Name must be a string"),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address")
      .isString()
      .withMessage("Email must be a string")
      .custom(async (value) => {
        const existingUser = await Account.findOne({ email: value });
        if (existingUser) throw new Error("Email already in use");
      }),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .isString()
      .withMessage("Password must be a string"),
  ],

  signup: async (req, res) => {
    const { body } = req;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ errors: errors.array({ onlyFirstError: true }) });
      }

      const hashedPassword = await hashPassword(body.password);

      if (!hashedPassword) {
        throw new Error("Failed to has the password");
      }

      // Create account
      const newAccount = {
        email: body.email,
        password: hashedPassword,
      };

      const account = new Account(newAccount);
      const savedAccount = await account.save();

      if (!savedAccount) {
        throw new Error("Failed to create an account");
      }

      // Save user account to User collection
      const newUser = {
        name: body.name,
        account: account
      }

      const savedUser = new User(newUser);
      await savedUser.save()

      return res.status(200).send(savedUser);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
};

export default accountController;
