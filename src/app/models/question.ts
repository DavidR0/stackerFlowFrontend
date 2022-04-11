import Tag from "./tag";
import Vote from "./vote";

export default class Question {
    questionId: number;
    userId: number;
    author: string;
    title: string;
    content: string;
    creationTime: Date;
    voteCount: number;
    tags: Tag[];
    votes: Vote[];

    constructor(quest?: any){
        if(quest){
            this.questionId = quest.questionId;
            this.userId = quest.userId;
            this.author = quest.author;
            this.title = quest.title;
            this.content = quest.content;
            this.creationTime = quest.creationTime;
            this.voteCount = quest.voteCount;
            this.tags = quest.tags;
            this.votes = quest.votes;
        }
    }

}