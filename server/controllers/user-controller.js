import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
