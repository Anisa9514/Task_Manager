export class Task{
    public title : string;
    public description : string;
    public state : string;
    public tags : string[];
    public assignees : string[];

    constructor(
        title : string,
        description: string,
        state : string,
        tags : string[],
        assignees : string[]
    ){
        this.title = title;
        this.description = description;
        this.state = state;
        this.tags = tags;
        this.assignees = assignees;
    }
}