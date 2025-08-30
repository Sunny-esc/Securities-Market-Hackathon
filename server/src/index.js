// server.js
import dotenv from 'dotenv';// to load environment variables from .env file
import express from "express";
import cors from "cors";
import db from "./model/index.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import grouter from './routes/get.routes.js';
import prouter from './routes/post.routes.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Node.js JWT Authentication application." });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);
app.use("/api/proute", prouter);
app.use("/api/groute", grouter);

// Set port, listen for requests


const initializeRoles = async () => {
    const roles = ["user", "moderator", "admin"];
    for (const role of roles) {
        await db.role.findOrCreate({
            where: { name: role },
        });
    }
};

const PORT = process.env.PORT || 4000;

db.sequelize.sync().then(async () => {
    await initializeRoles();
    app.listen(PORT, () => {
        console.log(`Server is running on port ✅✅✅✅✅✅🔥🔥🔥http://localhost:${PORT}`);
    });
});
