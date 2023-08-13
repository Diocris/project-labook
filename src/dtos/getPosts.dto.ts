import z from "zod"

export type GetPostsInputDTO = { auth: string, id: string }


export interface GetPostOutputDTO {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    uploadedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export const getPostsSchema = z.object({
    auth: z.string({
        required_error: "A JWT Token is expected on authorization headers.",
        invalid_type_error: "Invalid Authorization token format."
    }).min(1), id: z.string().min(1)
})
    .transform(data => data as GetPostsInputDTO)