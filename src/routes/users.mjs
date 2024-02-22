import { Router } from "express";
import requireAuth from "../middleware/auth.mjs";

const userRouter = Router();

userRouter.get("/", requireAuth, (req, res) => {
  res.send(req.user);
});

export default userRouter;
