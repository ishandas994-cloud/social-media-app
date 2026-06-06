import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userrouter from "./rouths/user.rouths.js";

app.use("/user", userrouter);
app.get("/", (req, res) => {
  res.send("Backend running successfully");
});


//for postman
app.use(express.json());

app.post("/register", (req, res) => {

    console.log(req.body);

    res.send("Data received");
}); 
export default app;