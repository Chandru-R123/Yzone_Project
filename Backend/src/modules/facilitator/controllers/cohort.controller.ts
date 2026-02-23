import { Request, Response } from "express";
import { CohortService } from "../services/cohort.service";

const cohortService = new CohortService();

export class CohortController {

  async create(req: Request, res: Response) {
    try {
      const cohort = await cohortService.createCohort(req.body);
      res.status(201).json(cohort);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}