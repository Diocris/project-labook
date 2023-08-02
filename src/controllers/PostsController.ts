import { randomUUID } from "crypto";
import { PostsBusiness } from "../business/PostsBusiness";
import { PostsDatabase } from "../database/PostsDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/idGenerator";
import { Request, Response } from "express";
import { CreatePostOutputDTO, CreatePostSchema } from "../dtos/createPost.dto";

export class PostsController {
    constructor(private postsBusiness: PostsBusiness) {

    }


    public getPosts = async (req: Request, res: Response) => {

        try {
            const output = this.postsBusiness.getPosts()

            res.status(200).send(output)

        } catch (error: any) {
            if (res.statusCode === 20) {
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

            const input = CreatePostSchema.parse({
                content: req.body.content,
                creator: req.headers.authorization
            })

            const output = this.postsBusiness.createPost(input)

            res.status(200).send(output)

        } catch (error: any) {
            if (res.statusCode === 20) {
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