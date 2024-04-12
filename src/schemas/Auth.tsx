import { z } from "zod";


export const SignupUserSchema = z.object({
    fullName:z.string().trim().min(1,"Name must contain atleast 1 character").max(200,"Name cannot be greater than 200 characters"),
    email:z.string().trim().email("Email is not valid"),
    password:z.string().trim().min(8,"Password should have atleast 8 characters")
})


export const LoginUserSchema = z.object({
    email:z.string().trim().email("Email is not valid"),
    password:z.string().min(1,"Password is required")
})

export const VerificationUserSchema = z.object({
    code:z.string().length(6,"Invalid Verification Code")
})

