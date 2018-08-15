import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TasksService {

  tasks: Observable<Task[]>;
  errors: Observable <string[]>;
  private _tasks: BehaviorSubject<Task[]>;
  private _errors: BehaviorSubject<string[]>;
  private baseUrl: string;
  private dataStore: {
    tasks: Task[],
    errors: string[]
  }

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8000/api";
    this.dataStore = { tasks: [], errors: [] };
    this._tasks = <BehaviorSubject<Task[]>> new BehaviorSubject([]);
    this.tasks = this._tasks.asObservable();
    this._errors = <BehaviorSubject<string[]>> new BehaviorSubject([]);
    this.errors = this._errors.asObservable();
  }

  addError(err: string){
    this.dataStore.errors.push(err);
    this._errors.next(this.dataStore.errors);
  }

  removeError(index: number){
    this.dataStore.errors.splice(index, 1);
    this._errors.next(this.dataStore.errors);
  }
  
  getAllTasks(){
    this.http.get<any>(this.baseUrl + "/tasks").pipe(
      map(res => {
        return res.map(task => {
          let newTask = new Task();
          newTask.deserialize(task);
          return newTask;
        });
      })
    ).subscribe(data => {
      this.dataStore.tasks = data;
      this._tasks.next(Object.assign({}, this.dataStore).tasks);
    }, error => {
      this.addError('There was an error in fetching tasks. Please try again later');
      console.log('Could not load tasks. Error: ' + error );
    });
  }

  addTask(task: Task) {
    this.http.post<any>(this.baseUrl + "/tasks", task).subscribe(data => {
      this.dataStore.tasks.push(task);
      this._tasks.next(Object.assign({}, this.dataStore).tasks);
    }, error => {
      this.addError('There was an error in creating the task. Please try again later');
      console.log('Could not create task. Error: ' + error )
    });
  }

  updateTask(task: Task) {
    this.http.put<any>(this.baseUrl + "/task/" + task._id, task).subscribe(data => {
      const index = this.dataStore.tasks.findIndex((t) => t._id === task._id);
      this.dataStore.tasks.splice(index, 1);
      this.dataStore.tasks.push(task);
      this._tasks.next(Object.assign({}, this.dataStore).tasks);
    }, error => {
      this.addError('There was an error in updating the task. Please try again later');
      console.log('Could not update task. Error: ' + error)
    });
  }

  removeTask(task: Task) {
    this.http.delete<any>(this.baseUrl + "/task/" + task._id).subscribe(data => {
      const index = this.dataStore.tasks.findIndex(t => t._id === task._id);
      this.dataStore.tasks.splice(index, 1);
      this._tasks.next(Object.assign({}, this.dataStore).tasks);
    }, error => {
      this.addError('There was an error in removing the task. Please try again later');
      console.log('Could not delete task. Error: ' + error)
    });
  }

  getAllTags(): Observable<string[]> {
    console.log('get all tags called');
    return this.http.get<any>(this.baseUrl + "/tags").pipe(
      map(res => {
        let tagArr = [];
        res.forEach(tag => {
          tagArr.push(tag.name);
        });
        return tagArr;
      })
    );
  }
}
