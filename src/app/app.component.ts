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
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
      culpa qui officia deserunt mollit anim id est laborum.`,
      {"year" : 2018, "month" : 5, "day" : 26},
      0,
      'In Progress',
      0,
      ['tag1','tag2','tag3'],
      ['Anisa']
    );

    let task2 = new Task(
      'Really Long Task Title',
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      {"year" : 2018, "month" : 5, "day" : 26},
      0,
      'In Progress',
      0,
      ['Hello World I will go','These should be','These shou', 'Hello'],
      ['Anisa']
    );
    this.tasksService.addTask(task2);
  }
}
