export interface Users {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: string
}

export interface Posts {
    id: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string
}

export interface Likes {
    userId: string,
    postId: string,
    like: number
}

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayLoad {
    id: string,
    name: string,
    role: USER_ROLES
}