import { Component, OnInit} from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task.model';
import { Observable } from '../../node_modules/rxjs';
import {
  trigger,
  style,
  animate,
  transition
}from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('visibility', [
      transition(':enter', [
        style({
          transform: 'translateY(5%)',
          opacity: 0
        }),
        animate('0.25s ease-in')
      ]),
      transition(':leave', [
        animate('0.25s ease-out', 
        style({
          opacity: 0,
          transform: 'translateY(5%)'
        }))
      ]),
    ])
  ]
})
export class AppComponent implements OnInit{
  tasks$: Observable<Task[]>;
  errors$: Observable<string[]>;
  loading$: Observable<boolean>;
  title = 'app';
  isFormCollapsed : boolean = true;

  showModal = false;
  constructor(
    private tasksService : TasksService,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(){
    this.tasks$ = this.tasksService.tasks;
    this.errors$ = this.tasksService.errors;
    this.loading$ = this.tasksService.loading;
    this.loading$.subscribe((res) => {
      if(res){
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
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
