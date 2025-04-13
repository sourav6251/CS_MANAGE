import { z } from "zod";

class NoticeboardValidation {
    // Create validation
    create = z.object({
        body: z.object({
            title: z
                .string({ required_error: "Title is required" })
                .min(3, "Title must be at least 3 characters")
                .max(60, "Title must not exceed 60 characters")
                .trim(),
            description: z
                .string({ required_error: "Description is required" })
                .min(3, "Description must be at least 3 characters")
                .max(500, "Description must not exceed 500 characters")
                .trim(),
            media: z
                .array(
                    z.object({
                        url: z
                            .string()
                            .url("Media URL must be a valid URL")
                            .optional(),
                        id: z
                            .string()
                            .optional(), // If needed you can add enum
                    })
                )
                .optional(),
            user: z
                .string({ required_error: "User ID is required" }),
            department: z
                .string({ required_error: "Department ID is required" }),
        }),
    });

    // Update validation
    update = z.object({
        params: z.object({
            noticeId: z.string({ required_error: "Notice ID is required" }),
        }),
        body: z.object({
            title: z
                .string()
                .min(3)
                .max(60)
                .trim()
                .optional(),
            description: z
                .string()
                .min(3)
                .max(500)
                .trim()
                .optional(),
            media: z
                .array(
                    z.object({
                        url: z.string().url().optional(),
                        id: z.string().optional(),
                    })
                )
                .optional(),
            user: z.string().optional(),
            department: z.string().optional(),
        }),
    });

    // Show with optional filters
    show = z.object({
        query: z.object({
            department: z.string().optional(),
            user: z.string().optional(),
        }),
    });

    // Delete validation
    delete = z.object({
        params: z.object({
            noticeId: z.string({ required_error: "Notice ID is required" }),
        }),
    });
}

export default new NoticeboardValidation();
