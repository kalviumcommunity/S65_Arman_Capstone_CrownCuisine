import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/database.js";
import userRouter from "./routes/user-route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use("/users", userRouter);

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();
