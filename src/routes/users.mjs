import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("OKE");
});

export default userRouter;
