import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from "@/lib/constants";
import { z } from "zod";

export const createAssigmentSchema = z.object({
  name: z.string().min(1, "Assignment name is required").max(200),
  instructions: z.string().min(1, "Instructions are required"),
  completionTime: z.coerce.date()
    .min(new Date(), { message: "Completion Date should be of Future" })
    .max(new Date(Date.now() + 5184000000), {
      message: "Completion Date should be max 2 month",
    }),
  delivery: z.string().min(10, "Enter a valid Delivery Address"),
  files: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file?.size <= MAX_UPLOAD_SIZE, {message: "Each File size must be less than 1MB"})
        .refine(
          (file) => {return ACCEPTED_FILE_TYPES.includes(file.type)},{
            message:"File must be an Image/PDF"
          }
        )
    )
    .min(1, "At least 1 file is required"),
});
