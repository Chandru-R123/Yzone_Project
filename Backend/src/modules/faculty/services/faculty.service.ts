import { FacultyRepository } from "../repositories/faculty.repository";
import { FeedbackInput } from "../types/faculty.types";

export class FacultyService {
  private repo = new FacultyRepository();

  async viewStudent(studentId: string) {
    return this.repo.getStudentById(studentId);
  }

  async viewDepartmentAggregate(cohortId: string) {
    return this.repo.getDepartmentAggregate(cohortId);
  }

  async viewCohortDashboard(cohortId: string) {
    return this.repo.getCohortDashboard(cohortId);
  }

  async provideFeedback(
    input: FeedbackInput,
    evaluatorId: string
  ) {
    const isActive = await this.repo.isReviewWindowActive(input.cohortId);

    if (!isActive) {
      throw new Error("Review window not active");
    }

    return this.repo.submitFeedback(
      input.studentId,
      evaluatorId,
      input.advisoryScores,
      input.comments
    );
  }
}