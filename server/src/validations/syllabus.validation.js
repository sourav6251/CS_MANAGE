import { z } from "zod";

class SyllabusValidation {
    create = z.object({
        body: z.object({
            user: z.string({
                required_error: "User ID is required"
            }),
            department: z.string({
                required_error: "Department ID is required"
            }),
            semester: z.string({
                required_error: "Semester ID is required"
            }),
            paperCode: z.string({
                required_error: "Paper code is required"
            }).min(3, "Paper code must be at least 3 characters")
              .max(10, "Paper code must not exceed 10 characters")
              .trim(),
            media: z.array({
                mediaUrl: z.string({
                    required_error: "Media URL is required"
                }).min(3, "Media URL must be at least 3 characters")
                  .max(100, "Media URL must not exceed 100 characters")
                  .trim(),
                mediaID: z.string({
                    required_error: "Media ID is required"
                }).min(3, "Media ID must be at least 3 characters")
                  .max(100, "Media ID must not exceed 100 characters")
                  .trim(),
            })
        })
    });

    update=z.object({
        params:z.object({
            syllabusId:z.string({
                required_error: "Media ID is required"
            })
        })
    })
    
    delete=z.object({
        params:z.object({
            syllabusId:z.string({
                required_error: "Media ID is required"
            })
        })
    })
}

export default new SyllabusValidation();
