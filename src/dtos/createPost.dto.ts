import z from "zod"

export interface CreatePostInputDTO {
    id: string,
    creator: string
}

export interface CreatePostOutputDTO {
    message: "string",
    token: "string"
}

export interface CreatorInputDTO {
    id: string,
    name: string
}
export interface CreatorOutputDTO {
    message: string
}

export const CreatorSchema = z.object({
    id: z.string(),
    name: z.string()
}).transform(data => data as CreatorInputDTO)

export const CreatePostSchema = z.object({
    id: z.string({ required_error: "Id is mandatory.", invalid_type_error: "Id must be a string." }).min(4),
    creator: z.string({ required_error: "Creator id invalid." }).min(1)
}).transform(data => data as CreatePostInputDTO)