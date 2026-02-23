import CohortRepository from "../repositories/cohort.repo";
import { Cohort } from "../types/cohort.types";

class CohortService {

  static async createCohort(data: Cohort) {
    return await CohortRepository.create(data);
  }

  static async getCohortsByTenant(tenantId: number) {
    return await CohortRepository.getByTenant(tenantId);
  }
}

export default CohortService;
