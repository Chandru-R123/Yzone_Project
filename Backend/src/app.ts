import express from "express";
import executiveRoutes from "./modules/tynExecutive/routes/executive.routes";

const app = express();

app.use(express.json());

app.use("/api/executive", executiveRoutes);

export default app;
