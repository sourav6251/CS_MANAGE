import { Departments } from "../model/department.model.js";
import { Externals } from "../model/external.model.js";
import { Facultys } from "../model/faculty.model.js";
import { Hods } from "../model/hod.model.js";
import { Students } from "../model/student.model.js";
import { Users } from "../model/user.model.js";
import departmentService from "./department.service.js";

class UserService {
    async RegisterUser(data, role, departmentID, depertmentName) {
        switch (role) {
            case "hod":
                return this.newHOD(data, depertmentName);
            case "faculty":
                const faculty = await this.createUser(data);
                return this.newFaculty(faculty._id, departmentID);
            case "external":
                const external = await this.createUser(data);
                return this.newExternal(external._id, departmentID);
            default:
                const student = await this.createUser(data);
                return this.newStudent(student._id, departmentID);
        }
    }

    async showuser() {
        return Users.find({});
    }

    async createUser(data) {
        return await Users.create(data);
    }

    async newHOD(data, depertmentName) {
        // const departmentID = await departmentService.createDepartment({
        //     name: depertmentName,
        // });
        const departmentID = await Departments.create({ name: depertmentName });
        const users = await this.createUser(data);
        const hodData = {
            user: users._id,
            department: departmentID._id,
        };
        return await Hods.create(hodData);
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

    // async login(data) {
    //     const { email, password } = data;
    
    //     // 1. Find the user and include password (since it's excluded by default)
    //     const user = await Users.findOne({ email }).select('+password');
    
    //     if (!user) {
    //         return "notExist";
    //     }
    
    //     // 2. Use the comparePassword method from your schema
    //     const isMatch = await user.comparePassword(password);
    
    //     if (!isMatch ) {
    //         return "notExist";
    //     }
    
    //     // 3. Return user (optional: remove password manually or regenerate without password)
    //     user.password = undefined; // Don't leak hashed password
    //     return user;
    // }
    async login(data) {
        const { email, password } = data;
    
        // 1. Find the user with password
        const user = await Users.findOne({ email }).select('+password');
        
        if (!user) {
            return "notExist";
        }
    
        // 2. Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return "notExist";
        }
    
        // 3. Get department based on role
        let departmentInfo = null;
        
        switch(user.role) {
            case 'hod':
                const hod = await Hods.findOne({ user: user._id }).populate('department');
                departmentInfo = hod?.department;
                break;
                
            case 'faculty':
                const faculty = await Facultys.findOne({ user: user._id }).populate('department');
                departmentInfo = faculty?.department;
                break;
                
            case 'student':
                const student = await Students.findOne({ user: user._id }).populate('department');
                departmentInfo = student?.department;
                break;
                
            case 'external':
                const external = await Externals.findOne({ user: user._id }).populate('department');
                departmentInfo = external?.department;
                break;
        }
    
        // 4. Return user with department info
        const userObj = user.toObject();
        delete userObj.password;
        
        return {
            ...userObj,
            department: departmentInfo
        };
    }
    
}
export default new UserService();
