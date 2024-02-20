import { Router } from "express";
import userRouter from "./users.mjs";
import accountRouter from "./account.mjs";

const router = Router();

// API Routes
router.use("/users", userRouter);
router.use("/account", accountRouter);

export default router;
