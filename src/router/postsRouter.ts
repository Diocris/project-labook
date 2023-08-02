import express from "express"
import { PostsController } from "../controllers/PostsController"
import { PostsBusiness } from "../business/PostsBusiness"
import { PostsDatabase } from "../database/PostsDatabase"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"


export const postsRouter = express.Router()


const postsController = new PostsController(new PostsBusiness(new PostsDatabase(), new IdGenerator(), new TokenManager()))

postsRouter.get("/", postsController.getPosts)
postsRouter.post("/", postsController.createPost)
