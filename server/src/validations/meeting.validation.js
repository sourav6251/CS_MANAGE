import { z } from "zod";

class MeetingValidation {
    create = z.object({
        body: z.object({
            user: z.string({ required_error: "User ID is required" }),
            title: z
                .string({ required_error: "Title is required" })
                .min(3, "Title must be at least 3 characters")
                .max(100, "Title must not exceed 100 characters")
                .trim(),
            description: z
                .string({ required_error: "Description is required" })
                .min(3, "Description must be at least 3 characters")
                .max(1000, "Description must not exceed 1000 characters")
                .trim(),
            mettingTime: z.string({ required_error: "Meeting time is required" }), // ISO string
            mettingArea: z
                .string({ required_error: "Meeting area is required" })
                .min(1, "Meeting area must not be empty")
                .trim(),
            participants: z
                .array(
                    z.object({
                        email: z
                            .string({ required_error: "Email is required" })
                            .email("Please provide a valid email address"),
                        user: z
                            .string()
                            .optional(), // You might not always have user ref
                    })
                )
                .optional(),
        }),
    });

    update = z.object({
        params: z.object({
            meetingId: z.string({ required_error: "Meeting ID is required" }),
        }),
        body: z.object({
            title: z.string().min(3).max(100).trim().optional(),
            description: z.string().min(3).max(1000).trim().optional(),
            mettingTime: z.string().optional(),
            mettingArea: z.string().trim().optional(),
            participants: z
                .array(
                    z.object({
                        email: z.string().email(),
                        user: z.string().optional(),
                    })
                )
                .optional(),
        }),
    });

    show = z.object({
        query: z.object({
            user: z.string().optional(), // participant user
            userhod: z.string().optional(), // meeting creator
        }),
    });

    delete = z.object({
        params: z.object({
            meetingId: z.string({ required_error: "Meeting ID is required" }),
        }),
    });
}

export default new MeetingValidation();
