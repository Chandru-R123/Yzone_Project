import { Request, Response } from "express";
import TenantService from "../services/tenant.service";

class TenantController {

  static async getAll(req: Request, res: Response) {
    const data = await TenantService.getTenants();
    res.json({ success: true, data });
  }

  static async getOne(req: Request, res: Response) {
    const data = await TenantService.getTenant(
      Number(req.params.id)
    );
    res.json({ success: true, data });
  }

  static async create(req: Request, res: Response) {
    const data = await TenantService.createTenant(req.body);
    res.json({ success: true, data });
  }
}

export default TenantController;
