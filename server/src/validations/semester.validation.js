import { z } from "zod";

class SemesterValidation {
  // create
  create = z.object({
    body: z.object({
      name: z
        .string({ required_error: "Semester name is required" })
        .min(3, "Semester name must be at least 3 characters")
        .max(15, "Semester name must not exceed 15 characters")
        .trim(),

      department: z
        .string({ required_error: "Department ID is required" })
        .min(1, "Department ID cannot be empty"),

      subject: z
        .array(
          z.object({
            paperCode: z
              .string({ required_error: "Paper code is required" })
              .min(3, "Paper code must be at least 3 characters")
              .max(20, "Paper code must not exceed 10 characters")
              .trim(),

            paperName: z
              .string({ required_error: "Paper name is required" })
              .min(3, "Paper name must be at least 3 characters")
              .max(30, "Paper name must not exceed 10 characters")
              .trim(),
          })
        )
        .min(1, "At least one subject must be provided"),
    }),
  });

  // update
  update = z.object({
    params: z.object({
      semesterId: z.string({ required_error: "Semester ID is required" }),
    }),
    body: z.object({
      name: z
        .string()
        .min(3, "Semester name must be at least 3 characters")
        .max(15, "Semester name must not exceed 15 characters")
        .trim()
        .optional(),

      department: z.string().optional(),

      subject: z
        .array(
          z.object({
            paperCode: z
              .string()
              .min(3, "Paper code must be at least 3 characters")
              .max(20, "Paper code must not exceed 10 characters")
              .trim(),

            paperName: z
              .string()
              .min(3, "Paper name must be at least 3 characters")
              .max(30, "Paper name must not exceed 10 characters")
              .trim(),
          })
        )
        .optional(),
    }),
  });

  // delete
  delete = z.object({
    params: z.object({
      semesterId: z.string({ required_error: "Semester ID is required" }),
    }),
  });
}

export default new SemesterValidation();