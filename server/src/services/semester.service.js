import { Semesters } from "../model/semester.model.js";

class SemesterService {
    async createSemester(data) {
        return await Semesters.create(data);
    }

    async showSemesterByDepartmentId(id) {
        return await Semesters.find({ department: id });
    }

    async showSemester(id) {
        console.log(id);
        
        const semester= await Semesters.findById(id);
        console.log(semester);
        
        return semester;
    }

    async updateSemester(id, data) {
        return await Semesters.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteSemester(id) {
        return await Semesters.findByIdAndDelete(id);
    }
}

export default new SemesterService();