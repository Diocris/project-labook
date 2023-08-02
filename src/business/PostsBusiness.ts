import { UserController } from "../controllers/UserController";
import { BaseDatabase } from "../database/BaseDatabase";
import { PostsDatabase } from "../database/PostsDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/createPost.dto";
import { TokenManager, TokenPayLoad, TokenPostPayLoad } from "../services/TokenManager";
import { IdGenerator } from "../services/idGenerator";
import { PostsDB } from "../types/types";

export class PostsBusiness {
    constructor(private postsDatabase: PostsDatabase, private idGenerator: IdGenerator, private tokenManager: TokenManager) { }

    public getPosts = async (): Promise<PostsDB[]> => {
        const output = this.postsDatabase.GetPosts()
        return output
    }

    public createPost = async (input: CreatePostInputDTO) => {


        await this.postsDatabase.CreateNewPost(input)


    }
}

