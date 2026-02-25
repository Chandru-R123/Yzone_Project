// src/modules/facultyPrincipal/services/faculty.service.ts
import FacultyRepository from "../repos/faculty.repo";
import { Faculty } from "../types/faculty.types";

class FacultyService {

  static async createFaculty(data: Faculty) {
    return FacultyRepository.create(data);
  }

  static async getFaculty(id: string) {
    return FacultyRepository.getById(id);
  }

  static async getAllFaculty() {
    return FacultyRepository.getAll();
  }
}

export default FacultyService;