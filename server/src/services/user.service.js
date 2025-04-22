import { Departments } from "../model/department.model.js";
import { Externals } from "../model/external.model.js";
import { Facultys } from "../model/faculty.model.js";
import { Students } from "../model/student.model.js";
import { Users } from "../model/user.model.js";
import departmentService from "./department.service.js";

class UserService {
    async createUser(data, role, departmentID, depertmentName) {
        const userID = await Users.create(data);
        switch (role) {
            case "hod":
                return this.newHOD(userID._id, depertmentName);
            case "faculty":
                return this.newFaculty(userID._id, departmentID);
            case "external":
                return this.newExternal(userID._id, departmentID);
            default:
                return this.newStudent(userID._id, departmentID);
        }
    }

    async showuser() {
        return Users.find({});
    }

    async newHOD(id, depertmentName) {
        // const departmentID = await departmentService.createDepartment({
        //     name: depertmentName,
        // });
const departmentID=Departments.create({name:depertmentName})
        const hodData = {
            user: id,
            department: departmentID._id,
        };
        return await Facultys.create(hodData);
    }

    async newFaculty(userID, departmentID) {
        const facultyData = {
            user: userID,
            department: departmentID,
        };
        return await Facultys.create(facultyData);
    }

    async newExternal(userID, departmentID) {
        const externalData = {
            user: userID,
            department: departmentID,
        };
        return await Externals.create(externalData);
    }
    async newStudent(userID, departmentID) {
        const studentData = {
            user: userID,
            department: departmentID,
        };
        return await Students.create(studentData);
    }
}
export default new UserService();
