import { z } from "zod";

class UsersValidation {
    create = z.object({
        body: z.object({
            name: z
                .string({ required_error: "Name is required" })
                .min(3, "Name must be at least 3 characters")
                .max(60, "Name must not exceed 60 characters")
                .trim(),

            email: z
                .string({ required_error: "Email is required" })
                .email("Please provide a valid email address")
                .trim(),

            password: z
                .string({ required_error: "Password is required" })
                .min(8, "Password must be at least 8 characters"),

            role: z
                .enum(["hod", "student", "faculty", "external", "superadmin"])
                .optional(),
 
            profile_pic: z
                .object({
                    url: z.string().url().optional(),
                    public_id: z.string().nullable().optional(),
                })
                .optional(),

            otp: z.number().optional(),
            otpExpiary: z.coerce.date().optional(),
            isProfileComplete: z.boolean().optional(),
        }),
    });

    update = z.object({
        params: z.object({
            userId: z.string({ required_error: "User ID is required" }),
        }),
        body: z.object({
            name: z
                .string()
                .min(3, "Name must be at least 3 characters")
                .max(60, "Name must not exceed 60 characters")
                .trim()
                .optional(),

            email: z
                .string()
                .email("Please provide a valid email address")
                .trim()
                .optional(),

            password: z.string().min(8).optional(),

            role: z.enum(["hod", "student", "faculty", "external", "superadmin"]).optional(),

            profile_pic: z
                .object({
                    url: z.string().url().optional(),
                    public_id: z.string().nullable().optional(),
                })
                .optional(),

            otp: z.number().optional(),
            otpExpiary: z.coerce.date().optional(),
            isProfileComplete: z.boolean().optional(),
        }),
    });
    show = z.object({
        query: z.object({
            department: z
                .string({ required_error: "Department is required" })
                .min(1, "Department cannot be empty"),
            semester: z.string().optional(),
            role: z.string().optional(),
        }),
    });
    delete = z.object({
        params: z.object({
            userId: z.string({ required_error: "User ID is required" }),
        }),
    });

    getById = z.object({
        params: z.object({
            userId: z.string({ required_error: "User ID is required" }),
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

export default new UsersValidation();