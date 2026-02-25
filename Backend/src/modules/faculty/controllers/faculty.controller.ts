import { Request, Response } from "express";
import { FacultyService } from "../services/faculty.service";

const service = new FacultyService();

export class FacultyController {

  async getStudent(req: Request, res: Response) {
    const data = await service.viewStudent(req.params.studentId as string);
    res.json(data);
  }

  async getDepartmentAggregate(req: Request, res: Response) {
    const data = await service.viewDepartmentAggregate(req.params.cohortId as string);
    res.json(data);
  }

  async getCohortDashboard(req: Request, res: Response) {
    const data = await service.viewCohortDashboard(req.params.cohortId as string);
    res.json(data);
  }

  async submitFeedback(req: Request, res: Response) {
    try {
      const evaluatorId = req.user!.id;
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