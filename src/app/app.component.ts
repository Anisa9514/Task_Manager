import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';
import { Observable } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks$: Observable<Task[]>;
  title = 'app';
  isFormCollapsed : boolean = true;

  constructor(
    private tasksService : TasksService
  ){}

  ngOnInit(){
    this.tasks$ = this.tasksService.tasks;
    this.tasksService.getAllTasks();
  }

  toggleForm(e){
    e.stopPropagation();
    this.isFormCollapsed = !this.isFormCollapsed
    return this.isFormCollapsed;
  }

  filter(){
   
  }

  onClickedOutside(e){
    this.isFormCollapsed = true;
  }
}
