export default class Vote {
    voteId: number;
    userId: number;
    itemId: number;
    voteType: string;
    itemType: "question" | "answer";

    constructor(vote?: any) {
        if (vote) {
            this.voteId = vote.voteId;
            this.userId = vote.userId;
            this.itemId = vote.itemId;
            this.voteType = vote.voteType;
            this.itemType = vote.itemType;
        }
    }
}

