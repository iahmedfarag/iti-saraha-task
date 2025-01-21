import User from "../Models/User.js";
import sendEmailAlert from "../services/sendEmail.js";

export const users = async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json({ users: users });
    } catch (err) {
        res.status(500).json({ error: "Registration failed.", err });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match!" });
        }
        const newUser = new User({ name, email, phoneNumber, password });
        await newUser.save();
        sendEmailAlert("email creation alert", `hi ${name}\nwelcome in saraha app`, email);
        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        if (err.code === 11000 && err.keyPattern.email) {
            return res.status(400).json({ error: "Email already exists." });
        }
        console.log(err);
        res.status(500).json({ error: "Registration failed.", err });
    }
};

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
