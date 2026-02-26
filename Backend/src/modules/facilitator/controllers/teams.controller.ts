import { Request, Response } from "express";
import { TeamsService } from "../services/teams.service";

const service = new TeamsService();

export class TeamsController {
  static async create(req: Request, res: Response) {
    try {
      const team = await service.createTeam(req.body);
      res.status(201).json({ success: true, data: team });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getByCohort(req: Request, res: Response) {
    try {
      const cohortId = Array.isArray(req.params.cohortId)
        ? req.params.cohortId[0]
        : req.params.cohortId;
      const teams = await service.getByCohort(cohortId);
      res.status(200).json({ success: true, data: teams });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}