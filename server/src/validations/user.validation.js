import { z } from "zod";

class UserValidation {
    create = z.object({
        body: z.object({
            name: z.string({ required_error: "Name is required" }).min(1, "Name cannot be empty"),
            email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
            password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters"),
            role: z.enum(["hod", "faculty", "external", "student"], {
                required_error: "Role is required",
            }),

            // Optional for image
            url: z.string().optional(),
            public_id: z.string().optional(),

            // Optional, handled by role condition
            departmentID: z.string().optional(),
            departmentName: z.string().optional(),

            // For external
            semester: z.string().optional(),
            paperCode: z.string().optional(),
            paperName: z.string().optional(),
            doe: z.string().optional(), // date of examination

        }).refine((data) => {
            // For HOD
            if (data.role === "hod") {
                return !!data.departmentName && !data.departmentID;
            }

            // For Faculty
            if (data.role === "faculty") {
                return !!data.departmentID && !data.departmentName;
            }

            // For External
            if (data.role === "external") {
                return !!(data.departmentID && data.semester && data.paperCode && data.paperName);
            }

            // For Student
            if (data.role === "student") {
                return !!(data.departmentID && data.semester);
            }

            return true;
        }, {
            message: "Invalid or missing fields based on role",
        }),
    });
}

export default new UserValidation();
