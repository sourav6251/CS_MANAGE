import axios from "axios";
import { toast } from "sonner";
import { loginState } from "../redux/userSlice";
import { store } from "../redux/store";

const { userid, departmentid } = store.getState().user;

class ApiFunction {
    backendUrl = "http://127.0.0.1:8080/api/v1/";

    async getAllDepartments() {
        try {
            const response = await axios.get(`${this.backendUrl}department/`);
            const departments = response.data?.data || [];
            const departmentDetails = departments.map((dept) => ({
                id: dept._id,
                name: dept.name,
            }));

            return departmentDetails;
        } catch (error) {
            console.error("Error fetching departments:", error);
            throw error;
        }
    }

    async createUser(e) {
        const registerPayload = {
            name: e.name,
            email: e.email,
            role: e.role,
            departmentName: e.departmentName,
            password: e.password,
            departmentID: e.departmentName,
        };

        try {
            const response = await axios.post(
                `${this.backendUrl}user/create`,
                registerPayload
            );
            console.log(response);
            console.log(response.request.status);
        } catch (error) {}
    }

    async loginUser(data) {
        try {
            const response = await axios.post(
                `${this.backendUrl}user/login/`,
                data
            );
            console.log(response);
            const userData = {
                isLogin: true,
                role: response.data.data.role,
                department: response.data.data.department.name,
                departmentid: response.data.data.department._id,
                username: response.data.data.name,
                userid: response.data.data._id,
                status: response.status,
            };

            console.log(`userData=>`, userData);

            toast.success("Login successful!");

            return userData;
        } catch (error) {
            toast.error("Invalied Username and Password");
            return error.status;
        }
    }

    async uploadNotice(data) {
        let noticeData = {
            title: "",
            description: "",
            media: {
                url: "",
                id: "",
            },
            user: "",
            department: "",
        };
        const cloudinaryResponse = await this.uploadCoudinary(data.file);
        console.log("coudinaryResponse", cloudinaryResponse);
        const mediaInfo = {
            url: cloudinaryResponse.secure_url,
            id: cloudinaryResponse.public_id,
        };
        noticeData = {
            title: data.title,
            description: data.description,
            media: {
                url: mediaInfo.url,
                id: mediaInfo.id,
            },
            user: userid,
            department: departmentid,
        };
        console.log("Notice=>", noticeData);

        try {
            const response = await axios.post(
                `${this.backendUrl}noticeboard/`,
                noticeData
            );
        } catch (error) {}
    }

    async uploadCoudinary(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "department"); // Replace with actual preset
        formData.append("cloud_name", "dnogpztwj"); // Optional if using Cloudinary base URL directly

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dnogpztwj/auto/upload", // auto = auto-detect type
                formData
            );

            console.log("Cloudinary Upload Response:", response.data);
            return response.data;
        } catch (error) {
            toast.success("Error uploading to file try again");
            console.error("Error uploading to file try again:", error);
            throw error;
        }
    }

    async showNotice() {
        try {
            
        const response = await axios.get(`${this.backendUrl}noticeboard/`, {
            params: {
                user: userid, // Replace with actual user ID
                department: departmentid, // Replace with actual department ID
            },
        });
        console.log("response",response.data.data);
        
        return response;
        // toast.success("")
        } catch (error) {
            toast.error("Something wrong pleas try again")
        }
    }
}

export default new ApiFunction();
