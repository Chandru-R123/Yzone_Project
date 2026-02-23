import { Request, Response } from "express";
import { TeamsService } from "../services/teams.service";

const service = new TeamsService();

export class TeamsController {
  createTeam(req: Request, res: Response) {
    service.createTeam(req.body)
      .then(team => res.status(201).json(team))
      .catch(err => res.status(500).json({ message: err.message }));
  }
}