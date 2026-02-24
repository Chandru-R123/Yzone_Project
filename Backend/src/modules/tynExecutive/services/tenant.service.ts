import TenantRepository from "../repositories/tenant.repo";
import { Tenant } from "../types/tenant.types";

class TenantService {

  static async getTenants(): Promise<Tenant[]> {
    return await TenantRepository.getAll();
  }

  static async getTenant(id: string): Promise<Tenant | null> {
    return await TenantRepository.getById(id);
  }

  static async createTenant(data: Tenant): Promise<Tenant> {
    return await TenantRepository.create(data);
  }
}

export default TenantService;