import { randomUUID } from "crypto";
import { PostsBusiness } from "../business/PostsBusiness";
import { PostsDatabase } from "../database/PostsDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/idGenerator";
import { Request, Response } from "express";
import { CreatePostOutputDTO, CreatePostSchema } from "../dtos/createPost.dto";
import { UserDatabase } from "../database/UserDatabase";
import { GetPostsInputDTO, getPostsSchema } from "../dtos/getPosts.dto";
import { EditPostSchema, editPostInputDTO } from "../dtos/editPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO, DeletePostSchema } from "../dtos/deletePost.dto";

export class PostsController {
    constructor(private postsBusiness: PostsBusiness) {

    }


    public getPosts = async (req: Request, res: Response) => {

        try {

            const input: GetPostsInputDTO = getPostsSchema.parse({ auth: req.headers.authorization })
            const output = await this.postsBusiness.getPosts(input)


            res.status(200).send(output)


        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error.")
            }
        }


    }


    public createPost = async (req: Request, res: Response) => {
        try {
            const auth = req.headers.authorization

            const input = CreatePostSchema.parse({
                content: req.body.content,
                creator: auth
            })


            const output = await this.postsBusiness.createPost(input)

            res.status(200).send(output)

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error.")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const input: editPostInputDTO = EditPostSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id,
                content: req.body.content
            })


            const output = await this.postsBusiness.editPost(input)

            res.status(200).send(output)

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error.")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const input: DeletePostInputDTO = DeletePostSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id
            })

            const output: DeletePostOutputDTO = await this.postsBusiness.deletePost(input)

            res.status(200).send(output.message)

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error.")
            }
        }
    }


    public likePost = async (req: Request, res: Response) => {
        try {
            const input = {
                token: req.headers.authorization,
                postId: req.params.id,
                like: req.body.like
            }

            const output = await this.postsBusiness.likePost(input)


            return output

        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error.")
            }
        }
    }
}

