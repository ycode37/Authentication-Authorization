import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import router from "./routes/auhRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
dotenv.config();
dbConnect();

const app = express();

//Middleware

app.use(express.json());

//Routes
app.use("/api/auth", router);
app.use("/api/users",userRouter)

// Starting The Server

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is Running At Port ${PORT}`);
});
