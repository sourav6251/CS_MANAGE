import { Users } from "../model/user.model.js";
import crypto from "crypto";

class UsersService {
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
    async deleteUser(id) {
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

    async generateOTP(userId) {
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit
        const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min from now

        const user = await Users.findByIdAndUpdate(
            userId,
            { otp, otpExpiary: expiry },
            { new: true }
        );

        if (!user) {
            throw new Error("User not found");
        }
        return { email: user.email, otp };
    }

    async verifyOTP({ userId, otp }) {
        const user = await Users.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.otp || !user.otpExpiary) {
            throw new Error("No OTP has been set");
        }

        const isExpired = user.otpExpiary < new Date();
        const isMatch = user.otp === parseInt(otp);

        if (isExpired) {
            throw new Error("OTP has expired");
        }

        if (!isMatch) {
            throw new Error("Invalid OTP");
        }

        // ✅ OTP is valid → mark as verified
        user.otp = undefined;
        user.otpExpiary = undefined;
        user.verifyByOTP = true;

        await user.save();

        return { success: true, message: "OTP verified successfully" };
    }
}

export default new UsersService();
