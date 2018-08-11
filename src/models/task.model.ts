
export class Task{
    public static counter: number = 0;
    public id: number;
    public title : string;
    public description : string;
    public dueDate : {"year" : number, "month" : number, "day" : number};
    public state : string;
    public tags : string[];


    constructor(
        title : string,
        description: string,
        dueDate : {"year" : number, "month" : number, "day" : number},
        state : string,
        tags : string[],
    ){
        Task.counter++
        this.id = Task.counter;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.state = state;
        this.tags = tags;
    }
}