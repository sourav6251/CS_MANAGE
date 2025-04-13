import { Users } from "../model/user.model.js";

class UserService {
    
    //create user
    async createUser(data) {
        const user = await Users.create(data);
        return user;
    }
    //update user
    async updateUser(data, id) {
        const user = await Users.findByIdAndUpdate(id, data, { new: true });
        return user;
    }
    //delete user
    async deleteUser( id) {
        const user = await Users.findByIdAndDelete(id);
        return user;
    }

    async getUser(data) {
        
        const department = data.department;
        const semester = data.semester;
        const role = data.role;
        const filter = { department };
        if (semester) filter.semester = semester;
        if (paperCode) filter.paperCode = paperCode;
        if (role) filter.role = role;
         const user = await Users.find(filter);
               
        return user;
    }

}

export default new UserService();