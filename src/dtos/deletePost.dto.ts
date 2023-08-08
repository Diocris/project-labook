import z from "zod"

export interface DeletePostInputDTO {
    token: string,
    postId: string
}

export interface DeletePostOutputDTO {
    message: string
}

export const DeletePostSchema = z.object({
    token: z.string({ required_error: "Token is expected.", invalid_type_error: "Token shoud be a string." }).min(5),
    postId: z.string({ required_error: "Post id is expected.", invalid_type_error: "Post ID shoud be a string." }).min(1)

}).transform(data => data as DeletePostInputDTO)