import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
}from '@angular/animations';

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
        animate('0.5s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', 
        style({
          transform: 'translateX(-100%)',
        }))
      ]),
    ])
  ]
})
export class AddTaskFormComponent implements OnInit {
  @Input() show;
  constructor(
    public el: ElementRef,
    private tasksService : TasksService
  ) { }

  ngOnInit() {
    this.tasks = this.tasksService.tasks;
  }

  @Output('collapse') emitCollapseForm = new EventEmitter(); 

  tasks : Task[];
  states : string[] = [
    'Not Assigned',
    'Not Started',
    'In Progress',
    'Completed'
  ]

  possibleTags : string[] = [
    'school project',
    'work',
    'japanese',
    'misc'
  ]

  // Form Inputs
  title : string = '';
  description: string = '';
  dueDate : {"year" : number, "month" : number, "day" : number};
  state: string = 'Not Assigned';
  selectedTags: string[] = [];

  fillSelectedTags(tags : string[]){
    this.selectedTags = tags;
  }

  collapseForm(){
    this.emitCollapseForm.emit();
  }

  submitForm(){
    let newTask : Task = new Task(
      this.title,
      this.description,
      this.dueDate,
      this.state,
      this.selectedTags,
    )

    this.tasksService.addTask(newTask);
    this.collapseForm();
  }

}
