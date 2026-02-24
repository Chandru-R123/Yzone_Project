import express from "express";
import facilitatorRoutes from "./modules/facilitator/routes/facilitator.routes";
import executiveRoutes from "./modules/tynExecutive/routes/executive.routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/facilitator", facilitatorRoutes);
app.use("/api/executive", executiveRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running ✅" });
});

export default app;