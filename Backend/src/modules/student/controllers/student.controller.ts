// src/modules/student/controllers/student.controller.ts
import { Request, Response } from "express";
import StudentService from "../services/student.service";

class StudentController {

  // -------- STUDENT ----------

  static async register(req: Request, res: Response) {
    try {
      const student = await StudentService.createStudent(req.body);
      res.json({ success: true, student });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to register student", detail: err.detail });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const student = await StudentService.updateStudent(id, req.body);
      res.json({ success: true, student });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to update student", detail: err.detail });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const student = await StudentService.getStudentById(id);
      res.json({ success: true, student });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to fetch student", detail: err.detail });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const filters: any = {};
      if (req.query.tenant_id) filters.tenant_id = String(req.query.tenant_id);
      if (req.query.cohort_id) filters.cohort_id = String(req.query.cohort_id);
      if (req.query.team_id) filters.team_id = String(req.query.team_id);

      const students = await StudentService.getAllStudents(filters);
      res.json({ success: true, students });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to fetch students", detail: err.detail });
    }
  }

  // -------- TRACKER ----------

  static async addTracker(req: Request, res: Response) {
    try {
      const tracker = await StudentService.addTracker(req.body);
      res.json({ success: true, tracker });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to add tracker", detail: err.detail });
    }
  }

  static async updateTracker(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const tracker = await StudentService.updateTracker(id, req.body);
      res.json({ success: true, tracker });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to update tracker", detail: err.detail });
    }
  }

  static async getTrackers(req: Request, res: Response) {
    try {
      const studentId = String(req.params.id);
      const trackers = await StudentService.getTrackersByStudent(studentId);
      res.json({ success: true, trackers });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to fetch trackers", detail: err.detail });
    }
  }

  // -------- SUBMISSIONS ----------

  static async submitProject(req: Request, res: Response) {
    try {
      const fileUrl = req.file ? req.file.path : req.body.fileUrl;
      const submission = await StudentService.submitProject({ ...req.body, fileUrl });
      res.json({ success: true, submission });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to submit project", detail: err.detail });
    }
  }

  static async updateSubmission(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const fileUrl = req.file ? req.file.path : undefined;
      const submission = await StudentService.updateSubmission(id, { ...req.body, ...(fileUrl && { fileUrl }) });
      res.json({ success: true, submission });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to update submission", detail: err.detail });
    }
  }

  static async getSubmissions(req: Request, res: Response) {
    try {
      const studentId = String(req.params.studentId);
      const submissions = await StudentService.getSubmissionsByStudent(studentId);
      res.json({ success: true, submissions });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to fetch submissions", detail: err.detail });
    }
  }

}

export default StudentController;