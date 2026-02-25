import { Router } from "express";
import MentorReviewController from "../controllers/mentorReview.controller";
import authMiddleware from "../../../middleware/auth.middleware"; // optional
import roleMiddleware from "../../../middleware/role.middleware"; // optional

const router = Router();

// Protect all routes if you want
router.use(authMiddleware);
router.use(roleMiddleware(["MENTOR"]));

// Create review
router.post("/", MentorReviewController.create);

// Get all reviews by mentor
router.get("/mentor/:mentorId", MentorReviewController.getAllByMentor);

// Get review by ID
router.get("/:id", MentorReviewController.getOne);

export default router;