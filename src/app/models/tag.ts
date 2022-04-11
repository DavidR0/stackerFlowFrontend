//create class tag
export default class Tag {
    tagId: number;
    tag: string;
    qtagId: number;
    questionId: number;

    constructor(tag?:any) {
        if(tag){
            this.tagId = tag.tagId;
            this.tag = tag.tag;
            this.qtagId = tag.qtagId;
            this.questionId = tag.questionId;
        }
    }
}