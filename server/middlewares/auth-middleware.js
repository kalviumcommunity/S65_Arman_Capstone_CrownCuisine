import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const auth = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, JWT_SECRET);

    try {
        const user = await User.findOne({ _id: data.userId });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({
            error: "Not authorized to access this resource",
        });
    }
};
