import { Router } from "express";
import accountController from "../controllers/accountController.mjs";

const accountRouter = Router();

// Registering User
accountRouter.post(
  "/signup",
  accountController.validateSignup,
  accountController.signup
);

accountRouter.post("/signin", (req, res) => {
  res.send(req.body);
});

export default accountRouter;
