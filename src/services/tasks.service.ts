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
  private _tasks: BehaviorSubject<Task[]>;
  private baseUrl: string;
  private dataStore: {
    tasks: Task[]
  }

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8000/api";
    this.dataStore = { tasks: [] };
    this._tasks = <BehaviorSubject<Task[]>> new BehaviorSubject([]);
    this.tasks = this._tasks.asObservable();
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
    }, error => console.log('Could not load tasks. Error: ' + error ));
  }

  addTask(task: Task) {
    this.http.post<any>(this.baseUrl + "/tasks", task).subscribe(data => {
      this.dataStore.tasks.push(task);
      this._tasks.next(Object.assign({}, this.dataStore).tasks);
    }, error => console.log('Could not create task. Error: ' + error ));
  }

  updateTask(task: Task) {
    this.http.put<any>(this.baseUrl + "/task/" + task._id, task).subscribe(data => {
      const index = this.dataStore.tasks.findIndex((t) => t._id === task._id);
      this.dataStore.tasks.splice(index, 1);
      this.dataStore.tasks.push(task);
      this._tasks.next(Object.assign({}, this.dataStore).tasks);
    }, error => console.log('Could not update task. Error: ' + error));
  }

  removeTask(task: Task) {
    this.http.delete<any>(this.baseUrl + "/task/" + task._id).subscribe(data => {
      const index = this.dataStore.tasks.findIndex(t => t._id === task._id);
      this.dataStore.tasks.splice(index, 1);
      this._tasks.next(Object.assign({}, this.dataStore).tasks);
    }, error => console.log('Could not delete task. Error: ' + error));
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
