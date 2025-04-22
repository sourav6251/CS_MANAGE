import { z } from "zod";

class DepartmentValidation {
    
    // Create Department
    create = z.object({
        body: z.object({
            name: z
                .string({ required_error: "Department name is required !!" })
                .min(3, "Department name must be at least 3 characters")
                .max(60, "Department name should be in 60 characters")
                .trim(),

            capacity: z
                .number({ required_error: "Department capacity is required" })
                .min(1, "Capacity must be at least 1"),

            totalFaculty: z
                .number({ required_error: "Total faculty count is required" })
                .min(1, "There must be at least 1 faculty"),

            email: z
                .string({ required_error: "Email is required !" })
                .email("Please provide a valid email address")
                .trim(),
        }),
    });

    // Update Department
    update = z.object({
        params: z.object({
            departmentId: z.string({ required_error: "Department ID is required" }),
        }),
        body: z.object({
            name: z
                .string()
                .min(3, "Department name must be at least 3 characters")
                .max(60, "Department name should be in 60 characters")
                .trim()
                .optional(),

            capacity: z
                .number()
                .min(1, "Capacity must be at least 1")
                .optional(),

            totalFaculty: z
                .number()
                .min(1, "There must be at least 1 faculty")
                .optional(),

            email: z
                .string()
                .email("Please provide a valid email address")
                .trim()
                .optional(),
        }),
    });

    // Delete Department
    // show = z.object({
    //     params: z.object({
    //         departmentId: z.string({ required_error: "Department ID is required" }),
    //     }),
    // });
    // Delete Department
    delete = z.object({
        params: z.object({
            departmentId: z.string({ required_error: "Department ID is required" }),
        }),
    });
}

export default new DepartmentValidation();
