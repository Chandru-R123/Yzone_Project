import { Router } from "express";
import MentorReviewController from "../controllers/mentorReview.controller";

const router = Router();

// Create review
router.post("/review", MentorReviewController.create);

// Get reviews by mentor
router.get("/mentor/:mentorId", MentorReviewController.getByMentor);

// Get reviews for student
router.get("/student/:studentId", MentorReviewController.getByStudent);

export default router;