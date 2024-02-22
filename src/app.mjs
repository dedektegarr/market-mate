import express from "express";
import dotenv from "dotenv";
import router from "./routes/api.mjs";
import bodyParser from "body-parser";
import passport from "passport";
import strategy from "./auth/strategy/jwt-strategy.mjs";

const app = express();

// config
dotenv.config();

// parser
app.use(bodyParser.json());

// passport
app.use(passport.initialize())
passport.use(strategy)

// API Routes
app.use("/api/v1", router);

export default app;
