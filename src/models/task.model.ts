
export class Task{

    public id: number;
    public title : string;
    public description : string;
    public dueDate : Date;
    public state : string;
    public tags : string[];


    constructor(obj?: any){
        this.title = (obj && obj.title) || '';
        this.description = (obj && obj.description) || '';
        this.dueDate = (obj && obj.dueDate) || null;
        this.state = (obj && obj.state) || 'Not Started';
        this.tags = (obj && obj.tags) || [];
    }

    public deserialize(obj: any){
        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.dueDate = obj.dueDate;
        this.state = obj.state;
        this.tags = obj.tags;
    }

    public serialize(){
        let json: any = {};
        if(this.id){
            json.id = this.id;
        }

        json.title = this.title;
        json.description = this.description;
        json.dueDate = this.dueDate;
        json.state = this.state;
        json.tags = this.tags;

        return JSON.stringify(json);
    }
}