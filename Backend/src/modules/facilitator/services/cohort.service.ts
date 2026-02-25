// src/modules/facilitator/services/cohort.service.ts
import CohortRepository from "../Repos/cohort.repo";
import { Cohort } from "../types/cohort.types";

class CohortService {

  static async createCohort(data: Cohort) {
    return await CohortRepository.create(data);
  }

  static async getCohortsByTenant(tenantId: string) {
    return await CohortRepository.getByTenant(tenantId);
  }
}

export default CohortService;