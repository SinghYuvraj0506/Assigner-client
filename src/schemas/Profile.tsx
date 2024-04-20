import { z } from "zod";

export const EditProfileSchema = z.object({
    fullName: z.string().min(1, "Your Name is required").max(200),
    email: z.string().email("Enter Valid Email"),
    phone:z.string().length(10, { message: 'Must be a valid mobile number' }),
    institute:z.string().min(1, "Institute is required").max(500),
    location:z.object({
        latitude:z.number().min(1,"Location is invalid"),
        longitude:z.number().min(1,"Location is invalid")
    }).required()
})