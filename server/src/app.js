import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Build express app
const app = express();

app.use(cors({
    //! cautions change when deploy
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

export { app };