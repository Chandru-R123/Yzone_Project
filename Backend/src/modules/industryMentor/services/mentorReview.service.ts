import MentorReviewRepository from "../repos/mentor.Review.repo";
import { MentorReview } from "../types/mentorReview.types";

class MentorReviewService {

  static async createReview(data: MentorReview) {
    return await MentorReviewRepository.create(data);
  }

  static async getReviewsByMentor(mentorId: string) {
    return await MentorReviewRepository.getAllByMentor(mentorId);
  }

  static async getReviewById(id: string) {
    return await MentorReviewRepository.getById(id);
  }
}

export default MentorReviewService;