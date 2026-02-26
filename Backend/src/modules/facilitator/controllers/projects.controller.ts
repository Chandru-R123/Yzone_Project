import { Request, Response } from "express";
import { ProjectsService } from "../services/projects.service";

const service = new ProjectsService();

export class ProjectsController {
  static async createProject(req: Request, res: Response) {
    try {
      const project = await service.createProject(req.body);
      res.status(201).json({ success: true, data: project });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getProjectsByCohort(req: Request, res: Response) {
    try {
      const cohortId = Array.isArray(req.params.cohortId)
        ? req.params.cohortId[0]
        : req.params.cohortId;
      const projects = await service.getProjectsByCohort(cohortId);
      res.status(200).json({ success: true, data: projects });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getProjectsByTeam(req: Request, res: Response) {
    try {
      const teamId = Array.isArray(req.params.teamId)
        ? req.params.teamId[0]
        : req.params.teamId;
      const projects = await service.getProjectsByTeam(teamId);
      res.status(200).json({ success: true, data: projects });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}