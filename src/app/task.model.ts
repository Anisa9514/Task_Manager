export class Task{
    public static counter: number = 0;
    public id: number;
    public title : string;
    public description : string;
    public dueDate : {"year" : number, "month" : number, "day" : number};
    public timeEstimateInHours : number;
    public state : string;
    public progressEstimate : number = 0;
    public tags : string[];
    public assignees : string[];

    constructor(
        title : string,
        description: string,
        dueDate : {"year" : number, "month" : number, "day" : number},
        timeEstimateInHours : number,
        state : string,
        progressEstimate : number = 0,
        tags : string[],
        assignees : string[]
    ){
        Task.counter++
        this.id = Task.counter;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.timeEstimateInHours = timeEstimateInHours;
        this.state = state;
        this.progressEstimate = progressEstimate;
        this.tags = tags;
        this.assignees = assignees;
    }
}