import express from "express";
import facilitatorRoutes from "./modules/facilitator/routes/facilitator.routes";
const app = express();

app.use(express.json());

// Base path for facilitator
app.use("/api/facilitator", facilitatorRoutes);

export default app;
