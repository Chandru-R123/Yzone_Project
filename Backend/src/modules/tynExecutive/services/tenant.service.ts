import TenantRepository from "../repositories/tenant.repo";
import { Tenant } from "../types/tenant.types";

class TenantService {

  static async getTenants() {
    return await TenantRepository.getAll();
  }

  static async getTenant(id: number) {
    return await TenantRepository.getById(id);
  }

  static async createTenant(data: Tenant) {
    return await TenantRepository.create(data);
  }
}

export default TenantService;
