import Vote from "./vote";

export default class Answer{
    answerId: number;
    questionId: number;
    userId: number;
    author: string;
    content: string;
    voteCount: number;
    creationTime: Date;
    votes: Vote[];

    constructor(answer?: any){
        if(answer){
            this.answerId = answer.answerId;
            this.questionId = answer.questionId;
            this.userId = answer.userId;
            this.author = answer.author;
            this.content = answer.content;
            this.voteCount = answer.voteCount;
            this.creationTime = answer.creationTime;
            this.votes = answer.votes;
        }
    }

}