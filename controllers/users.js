import User from "../models/User.js";
import sendEmailAlert from "../services/sendEmail.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// register - create
export const register = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match!" });
        }

        if (!req.files || !req.files.photo || req.files.photo.length === 0) {
            return res.status(400).json({ message: "Photo is required!" });
        }

        const photoBuffer = req.files.photo[0].buffer;

        const photoUploadResult = await uploadToCloudinary(photoBuffer, "user_photos");

        const newUser = new User({
            name,
            email,
            phoneNumber,
            password,
            photo: photoUploadResult.secure_url,
        });

        await newUser.save();

        sendEmailAlert("Email Creation Alert", `Hi ${name},\nWelcome to Saraha App!`, email);

        res.status(201).json({ message: "User registered successfully.", user: newUser });
    } catch (err) {
        if (err.code === 11000 && err.keyPattern?.email) {
            return res.status(400).json({ error: "Email already exists." });
        }
        console.error(err);
        res.status(500).json({ error: "Registration failed.", err });
    }
};

// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid email or password." });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: "Invalid email or password." });
        res.status(200).json({ message: "Login successful." });
    } catch (err) {
        res.status(500).json({ error: "Login failed." });
    }
};

// get all users
export const users = async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json({ users: users });
    } catch (err) {
        res.status(500).json({ error: "Registration failed.", err });
    }
};
