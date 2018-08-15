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

@Component({
  selector: 'app-filter-task-form',
  templateUrl: './filter-task-form.component.html',
  styleUrls: ['./filter-task-form.component.css'],
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
export class FilterTaskFormComponent implements OnInit {
  @Input() show;
  
  @Output('collapse') emitCollapseForm = new EventEmitter(); 


  constructor(
    public el: ElementRef,
    private tasksService : TasksService
  ) { }

  ngOnInit() {
  }


  clearInputs() {
  }

  fillSelectedTags(tags : string[]){
  }

  collapseForm(){
    this.emitCollapseForm.emit();
  }

}
