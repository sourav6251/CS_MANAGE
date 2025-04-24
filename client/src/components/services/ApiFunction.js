import axios from "axios";
import { toast } from "sonner";
import store from "../../redux/Store";
// import { loginState } from "../redux/userSlice";
// import { store } from "../redux/store";

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
                `${this.backendUrl}users/login/`,
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
        try {
            if (!data.file) throw new Error("No file selected");

            const cloudinaryResponse = await this.uploadCoudinary(data.file);
            console.log("Cloudinary response:", cloudinaryResponse);

            const noticeData = {
                title: data.title,
                description: data.description,
                media: [
                    {
                        url: cloudinaryResponse.secure_url,
                        id: cloudinaryResponse.public_id,
                    },
                ],
                user: userid,
                department: departmentid,
                date: data.date,
            };

            const response = await axios.post(
                `${this.backendUrl}noticeboard/`,
                noticeData
            );

            return response.data;
        } catch (error) {
            console.error("Notice upload failed:", error);
            throw error;
        }
    }
    // async uploadNotice(data) {  //there is uploadNotice method call this method that can help to create notive the data are

    //     let noticeData = {
    //         title: "",
    //         description: "",
    //         media: {
    //             url: "",
    //             id: "",
    //         },
    //         user: "",
    //         department: "",
    //         date:null
    //     };
    //     const cloudinaryResponse = await this.uploadCoudinary(data.file);
    //     console.log("coudinaryResponse", cloudinaryResponse);
    //     const mediaInfo = {
    //         url: cloudinaryResponse.secure_url,
    //         id: cloudinaryResponse.public_id,
    //     };
    //     noticeData = {
    //         title: data.title,
    //         description: data.description,
    //         media: [{
    //             url: mediaInfo.url,
    //             id: mediaInfo.id,}
    //         ],
    //         user: userid,
    //         department: departmentid,
    //         date:data.date
    //     };
    //     console.log("Notice=>", noticeData);
    //    try {
    //         const response = await axios.post(
    //             `${this.backendUrl}noticeboard/`,
    //             noticeData
    //         );
    //     } catch (error) {}
    // }

    // async uploadCoudinary(file) {
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("upload_preset", "department"); // Replace with actual preset
    //     formData.append("cloud_name", "dnogpztwj"); // Optional if using Cloudinary base URL directly

    //     try {
    //         const response = await axios.post(
    //             "https://api.cloudinary.com/v1_1/dnogpztwj/auto/upload", // auto = auto-detect type
    //             formData
    //         );

    //         console.log("Cloudinary Upload Response:", response.data);
    //         return response.data;
    //     } catch (error) {
    //         toast.success("Error uploading to file try again");
    //         console.error("Error uploading to file try again:", error);
    //         throw error;
    //     }
    // }
    async uploadCoudinary(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "department"); // Verify this preset exists

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dnogpztwj/auto/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Cloudinary upload error:", error.response?.data);
            throw new Error(
                "File upload failed: " +
                    (error.response?.data?.error?.message || "Unknown error")
            );
        }
    }
    async showNotice() {
        try {
            const response = await axios.get(`${this.backendUrl}noticeboard/`, {
                params: {
                    // user: userid, // Replace with actual user ID
                    department: departmentid, // Replace with actual department ID
                },
            });
            console.log("response", response.data.data);

            return response.data.data;
            // toast.success("")
        } catch (error) {
            toast.error("Something wrong pleas try again");
        }
    }

    async uploadSyllabus(data) {
        let coudinaryResponse = await this.uploadCoudinary(data.syllabusFile);

        const mediaInfo = {
            url: coudinaryResponse.secure_url,
            id: coudinaryResponse.public_id,
        };
        let symmaus = {
            user: userid,
            department: departmentid,
            semester: data.semester,
            paperCode: data.paperCode,
            paperName: data.paperName,
            media: [
                {
                    mediaUrl: mediaInfo.url,
                    mediaID: mediaInfo.id,
                },
            ],
        };
        // http://127.0.0.1:8080/api/v1/syllabus
    }

    async updateNotice(id, data) {
        console.log("Enterin to update ", data, id);

        try {
            let cloudinaryResponse;
            let noticeData;
            // if (!data.file) throw new Error("No file selected");
            if (data.file) {
                cloudinaryResponse = await this.uploadCoudinary(data.file);

                noticeData = {
                    // _id: data._id,
                    title: data.title,
                    description: data.description,
                    media: [
                        {
                            url: cloudinaryResponse.secure_url,
                            id: cloudinaryResponse.public_id,
                        },
                    ],
                    user: userid,
                    department: departmentid,
                    date: data.date,
                };
            } else {
                noticeData = {
                    // _id: data._id,
                    title: data.title,
                    description: data.description,
                    user: userid,
                    department: departmentid,
                    date: data.date,
                };
            }

            const response = await axios.patch(
                `${this.backendUrl}noticeboard/${id}`, // Include notice ID in URL
                noticeData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("UpdateNotice", response);

            return response.data;
        } catch (error) {
            console.error("Notice upload failed:", error);
            throw error;
        }
    }

    async deleteNotice(id) {
        console.log(`id`, id);
        let response;
        try {
            response = await axios.delete(
                `${this.backendUrl}noticeboard/${id}`
            );
            console.log(response);
        } catch (error) {
            toast.error("Something wromg ");
        }
    }

    async uploadSyllabus(data) {
        console.log(data);

        try {
            const cloudinaryResponse = await this.uploadCoudinary(data.file);

            const syllabusData = {
                user: userid,
                department: departmentid,
                semester: data.semester,
                paperCode: data.paperCode,
                paperName: data.paperTitle, // Match form field to API field
                media: [
                    {
                        mediaUrl: cloudinaryResponse.secure_url,
                        mediaID: cloudinaryResponse.public_id,
                    },
                ],
            };

            const response = await axios.post(
                `${this.backendUrl}syllabus`,
                syllabusData
            );

            return response.data;
        } catch (error) {
            console.error("Syllabus upload failed:", error);
            throw error;
        }
    }

    async getSyllabi() {
        try {
            const response = await axios.get(`${this.backendUrl}syllabus`, {
                params: {
                    department: departmentid,
                },
            });
            console.log(departmentid);
            console.log(response.data.data);
            
            return response.data.data;
        } catch (error) {
            console.error("Error fetching syllabi:", error);
            throw error;
        }
    }

    async deleteSyllabus(id) {
        try {
            await axios.delete(`${this.backendUrl}syllabus/${id}`);
        } catch (error) {
            console.error("Error deleting syllabus:", error);
            throw error;
        }
    }

    async createRoutine(data) {
        try {
            const routineData = {
                user: userid,
                department: departmentid,
                semester: Number(data.semester),
                roomNo: data.room,
                schedules: data.days.map((day) => ({
                    dayName: day,
                    timeSlots: [
                        {
                            paperCode: data.paperCode,
                            professor: userid, // Assuming the current user is the professor
                            startTime: data.startTime,
                            endTime: data.endTime,
                        },
                    ],
                })),
            };

            const response = await axios.post(
                `${this.backendUrl}routine/`,
                routineData
            );
            return response.data.data;
        } catch (error) {
            console.error("Routine creation failed:", error);
            throw error;
        }
    }

    async getRoutines() {
        try {
            const response = await axios.get(`${this.backendUrl}routine/`, {
                params: {
                    department: departmentid,
                },
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching routines:", error);
            throw error;
        }
    }

    async updateRoutine(id, data) {
        try {
            const routineData = {
                user: userid,
                department: departmentid,
                semester: Number(data.semester),
                roomNo: data.room,
                schedules: data.days.map((day) => ({
                    dayName: day,
                    timeSlots: [
                        {
                            paperCode: data.paperCode,
                            professor: userid, // Assuming the current user is the professor
                            startTime: data.startTime,
                            endTime: data.endTime,
                        },
                    ],
                })),
            };

            const response = await axios.patch(
                `${this.backendUrl}routine/${id}`,
                routineData
            );
            return response.data.data;
        } catch (error) {
            console.error("Routine update failed:", error);
            throw error;
        }
    }

    async deleteRoutine(id) {
        try {
            await axios.delete(`${this.backendUrl}routine/${id}`);
        } catch (error) {
            console.error("Error deleting routine:", error);
            throw error;
        }
    }

    async getFacultyMembers() {
        try {
            const response = await axios.get(`${this.backendUrl}users/`, {
                params: {
                    role: "faculty",
                    department: departmentid,
                },
            });
            const faculty = response.data?.data || [];
            return faculty.map((f) => ({
                id: f._id,
                name: f.name,
                email: f.email,
                department: f.department?.name || "Unknown",
            }));
        } catch (error) {
            console.error("Error fetching faculty members:", error);
            throw error;
        }
    }

    async createMeeting(data) {
        try {
            const meetingTime = new Date(
                `${data.date}T${data.startTime}`
            ).toISOString();
            const meetingData = {
                user: userid,
                title: data.title,
                description: data.description || "",
                mettingTime: meetingTime,
                mettingArea: data.location,
                participants: [
                    ...data.selectedFaculty.map((id) => ({
                        user: id,
                        email:
                            data.faculty.find((f) => f.id === id)?.email || "",
                    })),
                    ...data.emailParticipants.map((email) => ({ email })),
                ],
            };

            const response = await axios.post(
                `${this.backendUrl}meeting/`,
                meetingData
            );
            return response.data.data;
        } catch (error) {
            console.error("Meeting creation failed:", error);
            throw error;
        }
    }

    async getMeetings() {
        try {
            const role = store.getState().user.role;
            const params = {};
            if (role === "hod") {
                params.userhod = userid; // Fetch meetings created by HOD
                params.user = userid; // Also include meetings where HOD is a participant
            } else {
                params.user = userid; // Fetch meetings where faculty is a participant
            }

            const response = await axios.get(`${this.backendUrl}meeting/`, {
                params,
            });
            return response.data.data || [];
        } catch (error) {
            console.error("Error fetching meetings:", error);
            throw error;
        }
    }

    // async getFacultyMembers() {
    //     try {
    //         const response = await axios.get(`${this.backendUrl}users/`, {
    //             params: {
    //                 role: "faculty",
    //                 department: departmentid,
    //             },
    //         });
    //         const faculty = response.data?.data || [];
    //         return faculty.map((f) => ({
    //             id: f._id,
    //             name: f.name,
    //             email: f.email,
    //             department: f.department?.name || "Unknown",
    //         }));
    //     } catch (error) {
    //         console.error("Error fetching faculty members:", error);
    //         throw error;
    //     }
    // }

    async createMeeting(data) {
        try {
            const meetingTime = new Date(
                `${data.date}T${data.startTime}`
            ).toISOString();
            const meetingData = {
                user: userid,
                title: data.title,
                description: data.description || "",
                mettingTime: meetingTime,
                mettingArea: data.location,
                participants: [
                    ...data.selectedFaculty.map((id) => ({
                        user: id,
                        email:
                            data.faculty.find((f) => f.id === id)?.email || "",
                    })),
                    ...data.emailParticipants.map((email) => ({ email })),
                ],
            };

            const response = await axios.post(
                `${this.backendUrl}meeting/`,
                meetingData
            );
            return response.data.data;
        } catch (error) {
            console.error("Meeting creation failed:", error);
            throw error;
        }
    }


    async getUsersByRole(role, departmentId = null) {
        try {
          const params = { role };
          if (departmentId) params.department = departmentId;
    
          const response = await axios.get(`${this.backendUrl}users/`, { params });
          const users = response.data?.data || [];
          return users.map((u) => ({
            id: u._id,
            name: u.name,
            email: u.email,
            phone: u.phone || "N/A", // Phone not in schema; use placeholder
            department: u.department?.name || "Unknown",
            semester: u.semester || null, // For students
          }));
        } catch (error) {
          console.error(`Error fetching ${role} users:`, error);
          throw error;
        }
    }

      async generateOTP(userId) {
        try {
          const response = await axios.get(`${this.backendUrl}users/generateotp/${userId}`);
          if (response.data.success) {
            return response.data.data;
          }
          throw new Error(response.data.message || "Failed to generate OTP");
        } catch (error) {
          console.error("Generate OTP error:", error);
          throw error;
        }
      }
    
      async verifyOTP(data) {
        try {
          const response = await axios.post(`${this.backendUrl}users/verifyotp`, data);
          if (response.data.success) {
            return response.data.data;
          }
          throw new Error(response.data.message || "Failed to verify OTP");
        } catch (error) {
          console.error("Verify OTP error:", error);
          throw error;
        }
      }

      async notifyParticipants(meetingId) {
        try {
          const response = await axios.post(`${this.backendUrl}meeting/notify/${meetingId}`);
          if (response.data.success) {
            return response.data.data;
          }
          throw new Error(response.data.message || "Failed to send notifications");
        } catch (error) {
          console.error("Notify participants error:", error);
          throw error;
        }
      }
}

export default new ApiFunction();
