import { Request, Response } from "express";
import StudentService from "../services/student.service";

class TrackerController {

  static async add(req: Request, res: Response) {
    const data = await StudentService.addTracker(req.body);
    res.status(201).json({ success: true, data });
  }

  static async getByStudent(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const data = await StudentService.getTrackers(id);
    res.json({ success: true, data });
  }
}

export default TrackerController;