import express from "express";
import cors from "cors";

// Routes
import studentRoutes from "./modules/student/routes/student.routes";
import facilitatorRoutes from "./modules/facilitator/routes/facilitator.routes";
import executiveRoutes from "./modules/tynExecutive/routes/executive.routes";
import mentorRoutes from "./modules/industryMentor/routes/mentor.routes";
import facultyRoutes from "./modules/facultyPrincipal/routes/faculty.routes";

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Yzone API running 🚀",
  });
});

// Register Routes
app.use("/api/student", studentRoutes);
app.use("/api/facilitator", facilitatorRoutes);
app.use("/api/executive", executiveRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/faculty", facultyRoutes);

export default app;