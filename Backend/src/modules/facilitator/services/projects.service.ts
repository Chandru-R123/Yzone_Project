import { ProjectsRepository } from "../Repos/projects.repo";
import { CreateProjectInput } from "../types/project.types";

export class ProjectsService {
  repo = new ProjectsRepository();

  createProject(data: CreateProjectInput) {
    return this.repo.createProject(data);
  }

  listProjects(teamId: string) {
    return this.repo.getProjectsByTeam(teamId);
  }
}