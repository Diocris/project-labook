import { USER_ROLES } from "../models/User"

export interface UsersDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface PostsDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface LikesDB {
    userId: string,
    postId: string,
    like: number
}

