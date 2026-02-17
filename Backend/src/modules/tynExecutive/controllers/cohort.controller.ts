import { Request, Response } from "express";
import CohortService from "../services/cohort.service";

class CohortController {

  static async create(req: Request, res: Response) {
    const data = await CohortService.createCohort(req.body);
    res.json({ success: true, data });
  }

  static async getByTenant(req: Request, res: Response) {
    const data = await CohortService.getCohortsByTenant(
      Number(req.params.tenantId)
    );
    res.json({ success: true, data });
  }
}

export default CohortController;
