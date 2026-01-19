import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import simulationRoutes from "./routes/simulationRoutes.js";

dotenv.config();

const app = express();
const PORT = 3001;


app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());




app.use("/api", simulationRoutes);


app.get("/check", (req, res) => {
    res.json({ status: "Backend's running" });
});

app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
});
