import { BaseDatabase } from "./BaseDatabase";

export class LikesDatabase extends BaseDatabase {
    public static LIKES_TABLE = "likes_dislikes"

    //
    //Get Post Likes
    //
    public async getLikes(input: any) {
        const result = await BaseDatabase.connection(LikesDatabase.LIKES_TABLE).where({ post_id: input.postId, user_id: input.creatorId })
        return result
    }

    //
    //Like Post
    //
    public async likeDislike(input: any) {
        await BaseDatabase.connection(LikesDatabase.LIKES_TABLE).insert(input)
    }

    //
    //Edit Like quantity
    //
    public async editLike(input: any) {
        await BaseDatabase.connection(LikesDatabase.LIKES_TABLE).update(input).where({ post_id: input.post_id, user_id: input.user_id })
    }

    //
    //Delete Like from Post
    //
    public async deleteLike(input: any) {
        await BaseDatabase.connection(LikesDatabase.LIKES_TABLE).del().where({ user_id: input })
    }

    //   
    //Likes and Dislikes Posts
    //
    public async countLike(input: any) {
        return await BaseDatabase.connection(LikesDatabase.LIKES_TABLE).where({ post_id: input, like: 1 }).count()
    }
    public async countDislike(input: any) {
        return await BaseDatabase.connection(LikesDatabase.LIKES_TABLE).where({ post_id: input, like: 0 }).count()
    }
}