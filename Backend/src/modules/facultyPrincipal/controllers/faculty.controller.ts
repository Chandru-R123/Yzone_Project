// src/modules/facultyPrincipal/controllers/faculty.controller.ts
import { Request, Response } from "express";
import FacultyService from "../services/faculty.service";

class FacultyController {

  static async create(req: Request, res: Response) {
    try {
      const data = await FacultyService.createFaculty(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to create faculty" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const data = await FacultyService.getAllFaculty();
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch faculty" });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const data = await FacultyService.getFaculty(id);

      if (!data) {
        return res.status(404).json({ success: false, message: "Faculty not found" });
      }

      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch faculty" });
    }
  }
}

export default FacultyController;