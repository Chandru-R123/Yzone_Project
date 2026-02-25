import { Request, Response } from "express";
import { FacultyService } from "../services/faculty.service";

const service = new FacultyService();

export class FacultyController {

  async getStudent(req: Request, res: Response) {
    const studentId = req.params.studentId as string;
    const data = await service.viewStudent(studentId);
    res.json(data);
  }

  async getDepartmentAggregate(req: Request, res: Response) {
    const cohortId = req.params.cohortId as string;
    const data = await service.viewDepartmentAggregate(cohortId);
    res.json(data);
  }

  async getCohortDashboard(req: Request, res: Response) {
    const cohortId = req.params.cohortId as string;
    const data = await service.viewCohortDashboard(cohortId);
    res.json(data);
  }

  async submitFeedback(req: Request, res: Response) {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const evaluatorId = user.id;

      const result = await service.provideFeedback(
        req.body,
        evaluatorId
      );

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}