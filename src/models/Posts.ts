export class Posts {
    constructor(private id: string,
        private creatorID: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string) {
        this.id = id
        this.creatorID = creatorID
        this.content = content
        this.likes = likes
        this.dislikes = dislikes
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    public getId(): string {
        return this.id
    }
    public setId(value: string): void {
        this.id = value
    }

    public getCreatorId(): string {
        return this.creatorID
    }
    public setCreatorId(value: string): void {
        this.creatorID = value
    }

}