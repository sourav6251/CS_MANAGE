import { z } from "zod";

class RoutineValidation {
    // Validation schema for creating a routine
    create = z.object({
        body: z.object({
            user: z.string({ required_error: "User ID is required" }),
            department: z.string({ required_error: "Department ID is required" }),
            semester: z.number({ required_error: "Semester ID is required" }),
            roomNo: z.string().optional(),
            schedules: z
                .array(
                    z.object({
                        dayName: z.enum([
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                        ], {
                            required_error: "Day name is required",
                        }),
                        timeSlots: z
                            .array(
                                z.object({
                                    paperCode: z
                                        .string({ required_error: "Paper code is required" })
                                        .min(3, "Paper code must be at least 3 characters")
                                        .max(10, "Paper code must not exceed 10 characters")
                                        .trim(),
                                    professor: z.string({ required_error: "Professor ID is required" }),
                                    startTime: z
                                        .string({ required_error: "Start time is required" })
                                        .min(1, "Start time cannot be empty"),
                                    endTime: z
                                        .string({ required_error: "End time is required" })
                                        .min(1, "End time cannot be empty"),
                                })
                            )
                            .min(1, "At least one time slot is required"),
                    })
                )
                .min(1, "At least one schedule entry is required"),
        }),
    });

    // Validation schema for updating a routine
    update = z.object({
        params: z.object({
            routineId: z.string({ required_error: "Routine ID is required" }),
        }),
        body: z.object({
            user: z.string().optional(),
            department: z.string().optional(),
            semester: z.string().optional(),
            roomNo: z.string().optional(),
            schedules: z
                .array(
                    z.object({
                        dayName: z
                            .enum([
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday",
                            ])
                            .optional(),
                        timeSlots: z
                            .array(
                                z.object({
                                    paperCode: z
                                        .string()
                                        .min(3, "Paper code must be at least 3 characters")
                                        .max(10, "Paper code must not exceed 10 characters")
                                        .trim()
                                        .optional(),
                                    professor: z.string().optional(),
                                    startTime: z.string().optional(),
                                    endTime: z.string().optional(),
                                })
                            )
                            .optional(),
                    })
                )
                .optional(),
        }),
    });

    // Validation schema for fetching routines
    show = z.object({
        query: z.object({
            department: z.string().optional(),
            semester: z.string().optional(),
            user: z.string().optional(),
        }),
    });

    // Validation schema for deleting a routine
    delete = z.object({
        params: z.object({
            routineId: z.string({ required_error: "Routine ID is required" }),
        }),
    });
}

export default new RoutineValidation();
