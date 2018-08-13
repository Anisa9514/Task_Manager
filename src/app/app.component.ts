import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];
  title = 'app';
  isFormCollapsed : boolean = true;

  constructor(
    private tasksService : TasksService
  ){}

  ngOnInit(){
    this.fetchTasks();
  }

  fetchTasks(){
    this.tasksService.getAllTasks().subscribe(
      (res) => {this.tasks = res;}
     )
  }
  toggleForm(){
    this.isFormCollapsed = !this.isFormCollapsed
    return this.isFormCollapsed;
  }

  addTask(){
   
  }

  getTasks(){
    this.tasksService.getAllTasks().subscribe();
  }
}
