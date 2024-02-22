import express from "express";
import router from "./routes/api.mjs";
import bodyParser from "body-parser";
import passport from "passport";
import strategy from "./auth/strategy/jwt-strategy.mjs";
import { configDotenv } from "dotenv";

const app = express();

// config
configDotenv();

// parser
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
passport.use(strategy);

// API Routes
app.use("/api/v1", router);

export default app;
