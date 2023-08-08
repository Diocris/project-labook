import z from "zod"

export interface editPostInputDTO {
    token: string,
    postId: string,
    content: string
}

export interface editPostOutputDTO {
    message: string
}

export const EditPostSchema = z.object({
    token: z.string({ required_error: "Authorization token is expected.", invalid_type_error: "Invalid Authorization token format." }).min(1),
    postId: z.string({ required_error: "Post ID to be edited is expected.", invalid_type_error: "Invalid ID format." }).min(1),
    content: z.string({ required_error: "Edit is only available to content, try editing it.", invalid_type_error: "A string is expected." }).min(1)
}).transform(data => data as editPostInputDTO)