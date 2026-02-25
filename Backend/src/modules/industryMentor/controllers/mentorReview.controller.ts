import { Request, Response } from "express";
import MentorReviewService from "../services/mentorReview.service";

class MentorReviewController {

  static async create(req: Request, res: Response) {
    try {
      const data = await MentorReviewService.createReview(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to create review" });
    }
  }

  static async getAllByMentor(req: Request, res: Response) {
    try {
      // Cast to string to satisfy TypeScript
      const mentorId = Array.isArray(req.params.mentorId) ? req.params.mentorId[0] : req.params.mentorId;
      const data = await MentorReviewService.getReviewsByMentor(mentorId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch reviews" });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const data = await MentorReviewService.getReviewById(id);
      if (!data) return res.status(404).json({ success: false, message: "Review not found" });
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch review" });
    }
  }
}

export default MentorReviewController;