import { z } from "zod";

class UserValidation {
    create = z.object({
        body: z.object({
            name: z
                .string({ required_error: "Name is required" })
                .min(1, "Name cannot be empty"),
            email: z
                .string({ required_error: "Email is required" })
                .email("Invalid email format"),
            password: z
                .string({ required_error: "Password is required" })
                .min(6, "Password must be at least 6 characters"),
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
            semester: z.number().optional(),
            paperCode: z.string().optional(),
            paperName: z.string().optional(),
            doe: z.string().optional(), // date of examination
        })
        .superRefine((data, ctx) => {
            if (data.role === "hod" && !data.departmentName) {
                ctx.addIssue({
                    path: ["departmentName"],
                    code: z.ZodIssueCode.custom,
                    message: "HOD must have departmentName",
                });
            }
    
            if (data.role === "faculty" && !data.departmentID) {
                ctx.addIssue({
                    path: ["departmentID"],
                    code: z.ZodIssueCode.custom,
                    message: "Faculty must have departmentID",
                });
            }
    
            if (data.role === "external") {
                if (!data.departmentID ) {
                    ctx.addIssue({
                        path: ["external"],
                        code: z.ZodIssueCode.custom,
                        message: "External must have departmentID",
                    });
                }
            }
    
            if (data.role === "student" && !data.semester) {
                ctx.addIssue({
                    path: ["semester"],
                    code: z.ZodIssueCode.custom,
                    message: "Student must have a semester",
                });
            }
        })
        // .refine((data) => {
        //     // For HOD
        //     if (data.role === "hod") {
        //         return !!data.departmentName && !data.departmentID;
        //     }

        //     // For Faculty
        //     if (data.role === "faculty") {
        //         return !!data.departmentID && !data.departmentName;
        //     }

        //     // For External
        //     if (data.role === "external") {
        //         return !!(data.departmentID && data.semester && data.paperCode && data.paperName);
        //     }

        //     // For Student
        //     if (data.role === "student") {
        //         return !!(data.departmentID && data.semester);
        //     }

        //     return true;
        // }, {
        //     message: "Invalid or missing fields based on role",
        // }),
    });

    login = z.object({
        body: z.object({
            email: z
                .string({ required_error: "Email is required" })
                .trim()
                .email("Invalid email format"),
            password: z
                .string({ required_error: "Password is required" })
                .trim()
                .min(6, "Password must be at least 6 characters"),
        }),
    });


    generateOTP = z.object({
        params: z.object({
            userId: z
                .string({ required_error: "User ID is required" })
                .min(1, "User ID cannot be empty"),
        }),
    });
    
    verifyOTP = z.object({
        body: z.object({
            userId: z
                .string({ required_error: "User ID is required" })
                .min(1, "User ID cannot be empty"),
    
            otp: z
                .number({ required_error: "OTP is required" })
                .min(100000, "OTP must be a 6-digit number")
                .max(999999, "OTP must be a 6-digit number"),
        }),
    });
}

export default new UserValidation();
