import z from "zod"

export interface CreatePostInputDTO {
    content: string,
    creator: string
}

export interface CreatePostOutputDTO {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
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
    content: z.string({ required_error: "Write something to be posted.", invalid_type_error: "Try to use some letter." }).min(1),
    creatorId: z.string({ required_error: "Creator id invalid." }).optional()
}).transform(data => data as CreatePostInputDTO)