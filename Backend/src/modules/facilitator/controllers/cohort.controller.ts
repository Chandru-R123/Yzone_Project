// src/modules/facilitator/controllers/cohort.controller.ts
import { Request, Response } from "express";
import CohortService from "../services/cohort.service";

class CohortController {

  static async create(req: Request, res: Response) {
    try {
      const data = await CohortService.createCohort(req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to create cohort" });
    }
  }

  static async getByTenant(req: Request, res: Response) {
    try {
      const { tenantId } = req.params;
      if (!tenantId || Array.isArray(tenantId)) {
        return res.status(400).json({ success: false, message: "Invalid tenant ID" });
      }

      const data = await CohortService.getCohortsByTenant(tenantId);
      res.json({ success: true, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch cohorts" });
    }
  }
}

export default CohortController;