import { Request, Response } from "express";
import { ProjectsService } from "../services/projects.service";

const service = new ProjectsService();

export class ProjectsController {
  createProject(req: Request, res: Response) {
    service.createProject(req.body)
      .then(project => res.status(201).json(project))
      .catch(err => res.status(500).json({ message: err.message }));
  }
}