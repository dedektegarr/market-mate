import { Router } from "express";
import accountController from "../controllers/accountController.mjs";
import requireAuth from "../middleware/auth.mjs";

const accountRouter = Router();

// Registering User
accountRouter.post(
  "/signup",
  accountController.validateSignup,
  accountController.signup
);

accountRouter.post("/signin", accountController.signin);
accountRouter.get("/user", requireAuth, accountController.user);

export default accountRouter;
