// src/modules/student/routes/student.routes.ts
import { Router } from "express";
import multer from "multer";
import StudentController from "../controllers/student.controller";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// STUDENT
router.post("/register", StudentController.register);
router.patch("/update/:id", StudentController.update);
router.get("/:id", StudentController.getById);
router.get("/", StudentController.getAll);

// TRACKER
router.post("/tracker", StudentController.addTracker);
router.patch("/tracker/:id", StudentController.updateTracker);
router.get("/:id/tracker", StudentController.getTrackers);

// SUBMISSION
router.post("/submit", upload.single("file"), StudentController.submitProject);
router.patch("/submit/:id", upload.single("file"), StudentController.updateSubmission);
router.get("/submissions/:studentId", StudentController.getSubmissions);

export default router;