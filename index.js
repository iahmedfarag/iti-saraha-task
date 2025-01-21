import express from "express";
import mongoose from "mongoose";
import { register, login, users } from "./controllers/users.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/users", users);
app.post("/register", register);
app.post("/login", login);

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
