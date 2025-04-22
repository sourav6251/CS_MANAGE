import { z } from "zod";

class MeetingValidation {
    // Create Meeting
    create = z.object({
        body: z.object({
            user: z.string({ required_error: "Creator (user) ID is required" }),

            title: z
                .string({ required_error: "Meeting title is required" })
                .min(3, "Title must be at least 3 characters")
                .max(100, "Title must not exceed 100 characters")
                .trim(),

            description: z
                .string({ required_error: "Meeting description is required" })
                .min(3, "Description must be at least 3 characters")
                .max(1000, "Description must not exceed 1000 characters")
                .trim(),

            mettingTime: z
                .string({ required_error: "Meeting time is required" })
                .min(1, "Meeting time cannot be empty"), // ISO datetime string

            mettingArea: z
                .string({ required_error: "Meeting area is required" })
                .min(3, "Meeting area must be at least 3 characters")
                .max(255, "Meeting area must not exceed 255 characters")
                .trim(),

            joinusList: z
                .array(
                    z.string()
                        .email("Invalid email in joinusList")
                        .min(1, "Email cannot be empty")
                )
                .min(1, "At least one email is required in joinusList"),
        }),
    });

    // Update Meeting
    update = z.object({
        params: z.object({
            meetingId: z.string({ required_error: "Meeting ID is required" }),
        }),
        body: z.object({
            title: z
                .string()
                .min(3, "Title must be at least 3 characters")
                .max(100, "Title must not exceed 100 characters")
                .trim()
                .optional(),

            description: z
                .string()
                .min(3, "Description must be at least 3 characters")
                .max(1000, "Description must not exceed 1000 characters")
                .trim()
                .optional(),

            mettingTime: z.string().optional(),
            mettingArea: z.string().trim().optional(),

            joinusList: z
                .array(z.string().email("Invalid email"))
                .optional(),

            user: z.string().optional(),
        }),
    });

    // Delete Meeting
    delete = z.object({
        params: z.object({
            meetingId: z.string({ required_error: "Meeting ID is required" }),
        }),
    });

    // Show Meetings (optional filters)
    show = z.object({
        query: z.object({
            user: z.string().optional(),
            userhod: z.string().optional(),
        }),
    });
}

export default new MeetingValidation();
