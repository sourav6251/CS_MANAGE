import { Departments } from "../model/department.model.js";

class DepartmentService {
    async createDepartment(data) {
        const department = await Departments.create(data);
        return department;
    }

    async updateDepartment(id, data) {
        const department = await Departments.findByIdAndUpdate(id, data, {
            new: true,
        });
        return department;
    }

    async showDepartment(id) {
        if (!id) {
            return await Departments.find({});
        }
        return await Departments.findById(id);
    }

    async deleteDepartment(id) {
        const department = await Departments.findByIdAndDelete(id);
        return department;
    }
}

export default new DepartmentService();
