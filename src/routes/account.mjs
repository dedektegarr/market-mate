import { Router } from "express";

const accountRouter = Router();

accountRouter.post("/signup", (req, res) => {
  res.send(req.body);
});

accountRouter.post("/signin", (req, res) => {
  res.send(req.body);
});

export default accountRouter;
