import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import carRoutes from "./routes/cars.routes";

const app = express();

app.use(
  cors({
    origin: ["https://ferrari-showcase-dkwp.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

export default app;
