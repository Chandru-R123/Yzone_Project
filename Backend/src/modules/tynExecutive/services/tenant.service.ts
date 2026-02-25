import TenantRepository from "../repositories/tenant.repo";

interface TenantInput {
  college_name: string;
  principal_name: string;
  email: string;
  phone?: string;
  address?: string;
  status?: string;
}

class TenantService {

  static async createTenant(data: TenantInput) {
    // You could add extra validation here if needed
    return TenantRepository.createTenant(data);
  }

  static async getTenant(id: string) {
    return TenantRepository.getTenant(id);
  }

  static async getTenants() {
    return TenantRepository.getTenants();
  }
}

export default TenantService;