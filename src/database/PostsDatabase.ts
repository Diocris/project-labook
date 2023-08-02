import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/createPost.dto";
import { PostsDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase {
    public static POSTS_TABLE = "posts"

    public async GetPosts(): Promise<PostsDB[]> {
        const result = BaseDatabase.connection(PostsDatabase.POSTS_TABLE)
        return result
    }

    public async CreateNewPost(input: CreatePostInputDTO): Promise<void> {
        const result = BaseDatabase.connection(PostsDatabase.POSTS_TABLE).insert(input)
    }


}