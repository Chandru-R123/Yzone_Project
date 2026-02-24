import express from "express";
import facilitatorRoutes from "./modules/facilitator/routes/facilitator.routes";
const app = express();

// Middleware
app.use(express.json());

<<<<<<< HEAD
// Base path for facilitator
app.use("/api/facilitator", facilitatorRoutes);
=======
// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running ✅" });
});

// Mount routes
app.use("/api/executive", executiveRoutes);
>>>>>>> 344fe00 (hello)

export default app;
