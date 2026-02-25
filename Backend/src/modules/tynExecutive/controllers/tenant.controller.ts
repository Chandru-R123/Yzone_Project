import { Request, Response } from "express";
import TenantService from "../services/tenant.service";

class TenantController {

  static async getAll(req: Request, res: Response) {
    try {
      const data = await TenantService.getTenants();
      res.json({ success: true, data });
    } catch (error: any) {
      console.error("Error in getAll tenants:", error);
      res.status(500).json({ success: false, message: "Failed to fetch tenants" });
    }
  }

  static async getOne(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tenant ID",
      });
    }

    try {
      const data = await TenantService.getTenant(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Tenant not found",
        });
      }

      res.json({ success: true, data });
    } catch (error: any) {
      console.error("Error in getOne tenant:", error);
      res.status(500).json({ success: false, message: "Failed to fetch tenant" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      console.log("Tenant body received:", req.body); // ✅ DEBUG: check incoming JSON

      const { college_name, principal_name, email, phone, address, status } = req.body;

      // Validate required fields
      if (!college_name || !principal_name || !email) {
        return res.status(400).json({
          success: false,
          message: "college_name, principal_name, and email are required",
        });
      }

      const data = await TenantService.createTenant({
        college_name,
        principal_name,
        email,
        phone,
        address,
        status: status || "ACTIVE",
      });

      res.status(201).json({ success: true, data });
    } catch (error: any) {
      console.error("Error in create tenant:", error);
      res.status(500).json({ success: false, message: "Failed to create tenant" });
    }
  }
}

export default TenantController;