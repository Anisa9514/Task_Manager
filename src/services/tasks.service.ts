import { Injectable } from "@angular/core";
import { Task } from "../models/task.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
const BASE_URL = "http://localhost:8000/api";

@Injectable({
  providedIn: "root"
})
export class TasksService {

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    console.log('get all tasks called');
    return this.http.get<any>(BASE_URL + "/tasks").pipe(
      map(res => {
        return res.map(task => {
          let newTask = new Task();
          newTask.deserialize(task);
          return newTask;
        });
      })
    );
  }

  addTask(task: Task) {
    console.log('add task called');
    return this.http.post<any>(BASE_URL + "/tasks", task);
  }

  updateTask(task: Task) {

  }

  removeTask(task: Task) {

  }


}
