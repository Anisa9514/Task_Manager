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
  errors$: Observable<string[]>;
  title = 'app';
  isFormCollapsed : boolean = true;

  showModal = false;
  constructor(
    private tasksService : TasksService
  ){}

  ngOnInit(){
    this.tasks$ = this.tasksService.tasks;
    this.errors$ = this.tasksService.errors;
    this.tasksService.getAllTasks();
  }

  toggleForm(e){
    e.stopPropagation();
    this.isFormCollapsed = !this.isFormCollapsed
    return this.isFormCollapsed;
  }

  filter(){
  }

  removeAlert(index: number){
    this.tasksService.removeError(index);
  }
  onClickedOutside(e){
    if(e && e.target.classList.contains('custom-day')){
      return;
    }
    this.isFormCollapsed = true;
  }
}
