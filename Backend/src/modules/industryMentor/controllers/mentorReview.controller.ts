import { Request, Response } from "express";
import MentorReviewService from "../services/mentorReview.service";

class MentorReviewController {

  static async create(req: Request, res: Response) {
    try {
      const review = await MentorReviewService.createReview(req.body);

      res.status(201).json({
        success: true,
        data: review,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create review",
      });
    }
  }

  static async getByMentor(req: Request, res: Response) {
    try {
      const mentorId = req.params.mentorId as string;

      const reviews = await MentorReviewService.getReviewsByMentor(mentorId);

      res.json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch mentor reviews",
      });
    }
  }

  static async getByStudent(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId as string;

      const reviews = await MentorReviewService.getReviewsForStudent(studentId);

      res.json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch student reviews",
      });
    }
  }
}

export default MentorReviewController;