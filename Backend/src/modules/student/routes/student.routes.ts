import { Router } from "express";
import TrackerController from "../controllers/tracker.controller";
import SubmissionController from "../controllers/submission.controller";

const router = Router();

router.post("/tracker", TrackerController.add);
router.get("/:id/tracker", TrackerController.getByStudent);
router.post("/submit", SubmissionController.submit);

export default router;