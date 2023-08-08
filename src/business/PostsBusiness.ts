
import { CONSTRAINT } from "sqlite3";
import { PostsDatabase } from "../database/PostsDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/deletePost.dto";
import { editPostInputDTO, editPostOutputDTO } from "../dtos/editPost.dto";
import { GetPostOutputDTO, GetPostsInputDTO } from "../dtos/getPosts.dto";
import { BadRequest } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { Posts } from "../models/Posts";
import { TokenPayload, USER_ROLES } from "../models/User";
import { TokenManager, TokenPayLoad } from "../services/TokenManager";
import { IdGenerator } from "../services/idGenerator";
import { PostsDB } from "../types/types";

export class PostsBusiness {
    constructor(private postsDatabase: PostsDatabase, private idGenerator: IdGenerator, private tokenManager: TokenManager, private userDatabase: UserDatabase) { }

    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostOutputDTO[]> => {

        const { auth, id } = input

        if (!auth) {
            throw new BadRequest("Authorization required.")
        }

        const postsDatabase = await this.postsDatabase.getPosts(id)

        const output = []

        for (const post of postsDatabase) {

            const [user] = await this.userDatabase.getUsers(post.creator_id)

            const postDB: GetPostOutputDTO = {
                id: post.id,
                content: post.content,
                likes: post.likes,
                dislikes: post.dislikes,
                createdAt: post.created_at,
                uploadedAt: post.updated_at,
                creator: {
                    id: await user.id,
                    name: await user.name
                }

            }

            output.push(postDB)
        }


        return output
    }

    public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {

        const { content, creator } = input


        const [user] = await this.userDatabase.getUsers(creator)

        const postId = this.idGenerator.generate()


        const newPost: PostsDB = {
            id: postId,
            creator_id: user.id,
            content: content,
            likes: 0,
            dislikes: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        await this.postsDatabase.createNewPost(newPost)

        const output: CreatePostOutputDTO = {
            id: newPost.id,
            content: newPost.content,
            likes: newPost.likes,
            dislikes: newPost.dislikes,
            createdAt: newPost.created_at,
            updatedAt: newPost.updated_at,
            creator: {
                id: newPost.creator_id,
                name: user.name,
            }
        }


        return output
    }


    public editPost = async (input: editPostInputDTO): Promise<editPostOutputDTO> => {

        const { token, postId, content } = input

        const payLoad = this.tokenManager.getPayLoad(token)
        console.log(payLoad?.id)

        const [user] = await this.userDatabase.getUsers(payLoad?.id)

        if (!user) {
            throw new NotFoundError("User not found.")
        }

        if (user.id !== payLoad?.id || user.role !== USER_ROLES.ADMIN) {
            throw new BadRequest("Only the post creator can edit it.")
        }

        const [post] = await this.postsDatabase.getPosts(postId)

        if (!post) {
            throw new NotFoundError("Post not found.")
        }

        const editedPostModel: Posts = new Posts(
            post.id, post.creator_id, content, post.likes, post.dislikes, post.created_at, new Date().toISOString()
        )

        const editedPostDB: PostsDB = {
            id: editedPostModel.getId(),
            creator_id: editedPostModel.getCreatorId(),
            content: editedPostModel.getContent(),
            likes: editedPostModel.getLikes(),
            dislikes: editedPostModel.getDislikes(),
            created_at: editedPostModel.getCreatedAt(),
            updated_at: editedPostModel.getUploadedAt()

        }

        await this.postsDatabase.editPost(editedPostDB)

        const output: editPostOutputDTO = {
            message: `Post edited.`
        }

        return output
    }

    public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const { token, postId } = input

        if (postId === ":id" || !postId) {
            throw new BadRequest("Post ID is expected.")
        }

        const creator: TokenPayLoad | null = this.tokenManager.getPayLoad(token)

        const [post]: PostsDB[] = await this.postsDatabase.getPosts(postId)

        console.log(post.id)

        if (!post) {
            throw new NotFoundError("Post not found.")
        }

        if (creator?.id !== post.creator_id || creator.role !== USER_ROLES.ADMIN) {
            throw new BadRequest("Only the post creator can delete it.")
        }

        await this.postsDatabase.deletePost(post.id)

        const output: DeletePostOutputDTO = {
            message: "Post deleted."
        }

        return output

    }

    public likePost = async (input: any) => {
        const { token, postId, like } = input

        let likeValue;

        if (like === true) {
            likeValue = 1
        } else {
            likeValue = 0
        }

        const user = this.tokenManager.getPayLoad(token)

        const [userDB] = await this.userDatabase.getUsers(user?.id)

        const [post] = await this.postsDatabase.getPosts(postId)

        const likePostDB = {
            user_id: userDB.id,
            post_id: post.id,
            like: likeValue
        }



    }
}

