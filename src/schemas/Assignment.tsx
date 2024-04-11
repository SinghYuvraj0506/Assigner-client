
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from "@/lib/constants";
import { z } from "zod"
 
export const createAssigmentSchema = z.object({
  name: z.string().min(1).max(200),
  instructions: z.string().min(1),
  completionTime:z.date().min(new Date(), { message: "Completion Date should be of Future" }).max(new Date(Date.now() + 5184000000) , { message: "Completion Date should be max 2 month" }),
  files: z.array(z.instanceof(File))
  .refine(files => files.every((file) => {return !file || file?.size <= MAX_UPLOAD_SIZE}
  ,'File size must be less than 50MB'))
  .refine(files => files.every((file) => {return ACCEPTED_FILE_TYPES.includes(file.type)}
  ,'File must be an Image/PDF')),
  amount:z.number().min(30,"Minimum Amount For Assignment is 30")
})