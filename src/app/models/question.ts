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

    constructor(quest: any){

        this.questionId = quest.questionId;
        this.userId = quest.userId;
        this.author = quest.author;
        this.title = quest.title;
        this.content = quest.content;
        this.creationTime = new Date(quest.creationTime);
        this.voteCount = quest.voteCount;
    }

}