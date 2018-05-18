import { Component } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isFormCollapsed : boolean = true;

  constructor(
    private tasksService : TasksService
  ){}
  toggleForm(){
    this.isFormCollapsed = !this.isFormCollapsed
    return this.isFormCollapsed;
  }

  addTask(){
    let task = new Task(
      'Task Title',
      'Task Description',
      null,
      0,
      'Not Assigned',
      0,
      ['tag1','tag2','tag3'],
      ['Anisa']
    );
    this.tasksService.addTask(task);
  }
}
