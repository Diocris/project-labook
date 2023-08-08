
import { PostsDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase {
    public static POSTS_TABLE = "posts"

    public async getPosts(q?: string): Promise<PostsDB[]> {
        let result: PostsDB[] = []

        if (q) {
            result = await BaseDatabase.connection(PostsDatabase.POSTS_TABLE).where({ id: q })
        } else {
            result = await BaseDatabase.connection(PostsDatabase.POSTS_TABLE)
        }

        return result
    }

    public async createNewPost(input: PostsDB): Promise<void> {
        await BaseDatabase.connection(PostsDatabase.POSTS_TABLE).insert(input)
    }

    public async editPost(input: PostsDB): Promise<void> {
        await BaseDatabase.connection(PostsDatabase.POSTS_TABLE).update(input).where({ id: input.id })
    }

    public async deletePost(input: string): Promise<void> {
        await BaseDatabase.connection(PostsDatabase.POSTS_TABLE).del().where({ id: input })
    }
}