export class Likes {
    constructor(private user_id: string, private post_id: string, private like: number) {
        this.user_id = user_id
        this.post_id = post_id
        this.like = like
    }


}