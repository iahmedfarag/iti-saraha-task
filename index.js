import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";
import messagesRouter from "./routes/message.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/messages", messagesRouter);

mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
