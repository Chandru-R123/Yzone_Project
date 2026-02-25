import { Request, Response } from "express";
import StudentService from "../services/student.service";

class SubmissionController {

  static async submit(req: Request, res: Response) {
    const data = await StudentService.submitProject(req.body);
    res.status(201).json({ success: true, data });
  }
}

export default SubmissionController;