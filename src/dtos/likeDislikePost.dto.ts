import z from "zod"

export interface LikeDislikeInputDTO {
    token: string,
    postId: string,
    like: boolean
}

export type LikeDislikeOutputDTO = string | undefined


export const LikeDislikeSchema = z.object({
    token: z.string({ required_error: "A Token is expected.", invalid_type_error: "Token should be a string." }).min(1),
    postId: z.string({ required_error: "A Post Id is expected.", invalid_type_error: "Id should be a string." }).min(1),
    like: z.boolean({ required_error: "A boolean value is expected where true is like and false is dislike.", invalid_type_error: "A boolean value is expected." })
}).transform(data => data as LikeDislikeInputDTO)