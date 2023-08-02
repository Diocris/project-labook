import z from "zod"

export interface DeleteInputDTO {
    email: string
}

export interface DeleteOutputDTO {
    message: string
}

export const DeleteSchema = z.object({
    email: z.string().email()
}).transform(data => data as DeleteInputDTO)