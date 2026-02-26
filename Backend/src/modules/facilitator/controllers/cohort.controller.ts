// src/modules/facilitator/controllers/cohort.controller.ts
import { Request, Response } from "express";
import { CohortService } from "../services/cohort.service";

const service = new CohortService();

export class CohortController {
  static async create(req: Request, res: Response) {
    try {
      const cohort = await service.createCohort(req.body);
      res.status(201).json({ success: true, data: cohort });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getByTenant(req: Request, res: Response) {
    try {
      const tenantId = req.params.tenantId as string; // cast to string
      const cohorts = await service.getByTenant(tenantId);
      res.status(200).json({ success: true, data: cohorts });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // ✅ Add this static method
  static async getAll(req: Request, res: Response) {
    try {
      const cohorts = await service.getAllCohorts();
      res.status(200).json({ success: true, data: cohorts });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}