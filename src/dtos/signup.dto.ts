import z from "zod"
import { USER_ROLES } from "../models/User"

export interface SignupInputDTO {
    // Não recebemos o id na requisição ao criar user (agora nossa API vai criá-lo)
    // id: string, 
    name: string,
    email: string,
    password: string,
    role: USER_ROLES
}

export interface SignupOutputDTO {
    message: string,
    token: string
}

export const SignupSchema = z.object({
    name: z.string({ required_error: "Name is required.", invalid_type_error: "Name must be a string." }).min(2, "Name must have more than 2 digits."),
    email: z.string({ required_error: "Email is required.", invalid_type_error: "Email must be a string." }).email("Invalid email."),
    password: z.string({ required_error: "Password is required.", invalid_type_error: "Password must be a string" }).min(6, "Password must have more than 6 digits."),
    role: z.string({ required_error: "Role is required.", invalid_type_error: "Role must be a string." })
}).transform(data => data as SignupInputDTO)