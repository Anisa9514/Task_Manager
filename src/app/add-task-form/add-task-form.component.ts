import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import {
  trigger,
  style,
  animate,
  transition
}from '@angular/animations';
import { States } from 'src/app.constants';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css'],
  animations: [
    trigger('visibility', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', 
        style({
          transform: 'translateX(-100%)',
        }))
      ]),
    ])
  ]
})
export class AddTaskFormComponent implements OnInit {
  @Input() show;
  
  @Output('collapse') emitCollapseForm = new EventEmitter(); 
  @Output('addTaskSuccess') emitAddTaskSuccess = new EventEmitter();
  @Output('addTaskFail') emitAddTaskFail = new EventEmitter();
  
  states: string[] = States;
  possibleTags$: Observable<string[]>;

  // Form Inputs
  title : string;
  description: string;
  dueDate : {"year" : number, "month" : number, "day" : number};
  state: string;
  selectedTags: string[];

  constructor(
    public el: ElementRef,
    private tasksService : TasksService
  ) { }

  ngOnInit() {
    this.possibleTags$ = this.tasksService.tags;
    this.tasksService.getAllTags();
    this.title = '';
    this.description = '';
    this.state = 'Not Started';
    this.selectedTags = [];
  }


  clearInputs() {
    this.title = '';
    this.description = '';
    this.dueDate = null;
    this.state = 'Not Started';
    this.selectedTags = [];
  }

  fillSelectedTags(tags : string[]){
    this.selectedTags = tags;
  }

  collapseForm(){
    this.emitCollapseForm.emit();
  }

  submitForm(){
    // TODO: Validate form. Do not allow submission without title and description
    let newTask : Task = new Task({
      title: this.title,
      description: this.description,
      dueDate: new Date(this.dueDate.year, this.dueDate.month - 1, this.dueDate.day),
      state: this.state,
      tags: this.selectedTags,
    })

    this.tasksService.addTask(newTask);
    this.collapseForm();
    this.clearInputs();
  }

}
