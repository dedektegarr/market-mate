import { body, validationResult } from "express-validator";
import Account from "../models/Account.mjs";
import { checkPassword, hashPassword } from "../utils/bcrypt-password.mjs";
import User from "../models/Users.mjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { errorArrayToObject } from "../utils/validation-error.mjs";

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

    const session = mongoose.startSession();
    (await session).startTransaction();

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({
          status: "error",
          code: 400,
          message: "Validation Failed",
          errors: errorArrayToObject(errors.array({ onlyFirstError: true })),
        });
      }

      // Hash password
      const hashedPassword = await hashPassword(body.password);

      if (!hashedPassword) {
        throw new Error("Failed to has the password");
      }

      // Create user account
      const account = new Account({
        email: body.email,
        password: hashedPassword,
      });

      const savedAccount = await account.save();

      // Insert user data to users collection
      const user = new User({
        name: body.name,
        accountId: savedAccount._id,
      });

      const savedUser = await user.save();

      if (!savedAccount || !savedUser) {
        throw new Error("Failed to create an account");
      }

      (await session).commitTransaction();
      (await session).endSession();

      return res.status(200).send({
        status: "success",
        code: 200,
        message: "Registration successfull",
        data: { user: savedUser },
      });
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();

      return res.status(500).send({ message: error.message });
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const accountExists = await Account.findOne({ email: email });

      if (accountExists) {
        const passwordIsCorret = await checkPassword(
          password,
          accountExists.password
        );
        if (passwordIsCorret) {
          const token = jwt.sign(
            { id: accountExists._id },
            process.env.JWT_SECRET
          );

          return res.status(200).send({
            status: "success",
            code: 200,
            message: "Login Successfull",
            data: { token },
          });
        }
      }

      throw new Error("Invalid Credentials");
    } catch (error) {
      return res
        .status(401)
        .send({ status: "error", code: 401, message: error.message });
    }
  },

  user: async (req, res) => {
    res.status(200).send({
      status: "success",
      code: 200,
      message: "Current user retrieved successfull",
      data: { user: req.user },
    });
  },
};

export default accountController;
