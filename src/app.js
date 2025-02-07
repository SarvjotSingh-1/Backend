import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json()); // when data comes in JSON format
app.use(express.urlencoded({ extended: true })); // or false
//app.use(express.urlencoded({extend:true, limit:"16kb"}));  // when data comes in form format
app.use(express.static("public")); // to serve static files like files folder like pdf
app.use(cookieParser()); // user ke browerse ki cookies ko acess kr paaun

//routes import
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/user", userRouter);

//http://localhost:8000/api/v1/user/register

export { app };
