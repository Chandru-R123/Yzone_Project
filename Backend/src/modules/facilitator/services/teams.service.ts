import { TeamsRepository } from "../Repos/teams.repo";
import { CreateTeamInput } from "../types/teams.types";

export class TeamsService {
  repo = new TeamsRepository();

  createTeam(data: CreateTeamInput) {
    return this.repo.createTeam(data);
  }

  listTeams(cohortId: string) {
    return this.repo.getTeamsByCohort(cohortId);
  }
}