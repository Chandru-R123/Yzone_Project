import { Request, Response } from "express";
import TenantService from "../services/tenant.service";

class TenantController {

  static async getAll(req: Request, res: Response) {
    const data = await TenantService.getTenants();
    res.json({ success: true, data });
  }

  static async getOne(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tenant ID",
      });
    }

    const data = await TenantService.getTenant(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    res.json({ success: true, data });
  }

  static async create(req: Request, res: Response) {
    const data = await TenantService.createTenant(req.body);
    res.status(201).json({ success: true, data });
  }
}

export default TenantController;