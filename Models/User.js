import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const { Schema, model } = mongoose;

const ALGORITHM = "aes-256-cbc";
const ENCRYPTION_KEY = crypto.createHash("sha256").update(String("your-encryption-key")).digest();
const IV = Buffer.alloc(16, 0);

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    if (this.isModified("phoneNumber")) {
        const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, IV);
        let encrypted = cipher.update(this.phoneNumber, "utf8", "hex");
        encrypted += cipher.final("hex");
        this.phoneNumber = encrypted;
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default model("User", userSchema);
