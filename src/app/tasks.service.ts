import { Injectable } from '@angular/core';
import { Task } from './task.model'


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public tasks : Task[] = [];

  constructor() { }
  
  addTask(task: Task){
    // All tasks should have a unique ID
    let duplicate : Task = this.tasks.find((element) => {
      return task.id == element.id;
    });
    
    // Only add task if it is not already in array
    if(typeof duplicate == 'undefined'){
      this.tasks.push(task);
    }
  }

  removeTask(task : Task){
    // Return an array without the element 
    this.tasks = this.tasks.filter((el) => {
      el.id !== task.id;
    })
  }
}
