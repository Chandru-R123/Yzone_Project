import { CohortRepository } from "../Repos/cohort.repository";

export class CohortService {

  private cohortRepo = new CohortRepository();

  async createCohort(data: any) {
    if (!data.name) {
      throw new Error("Cohort name is required");
    }

    return await this.cohortRepo.createCohort(data);
  }
}