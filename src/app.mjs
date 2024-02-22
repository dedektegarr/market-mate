import express from "express";
import dotenv from "dotenv";
import router from "./routes/api.mjs";
import bodyParser from "body-parser";

const app = express();

// config
dotenv.config();

// parser
app.use(bodyParser.json());

// API Routes
app.use("/api/v1", router);

export default app;
