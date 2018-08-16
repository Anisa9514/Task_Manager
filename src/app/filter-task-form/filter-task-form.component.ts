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
import { NgbDate } from '../../../node_modules/@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbCalendar } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Observable } from '../../../node_modules/rxjs';

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
  @Output('change') emitChange = new EventEmitter();

  tags$: Observable<string[]>;

  // Date
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  
  constructor(
    public el: ElementRef,
    private tasksService : TasksService,
    public calendar: NgbCalendar
  ) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.tags$ = this.tasksService.tags;
    this.tasksService.getAllTags();
  }


  clearInputs() {
  }

  fillSelectedTags(tags : string[]){
  }

  collapseForm(){
    this.emitCollapseForm.emit();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = (date: NgbDate) => this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  isInside = (date: NgbDate) => date.after(this.fromDate) && date.before(this.toDate);
  isRange = (date: NgbDate) => date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date)

  onTagSelectionChange(e){
    console.log(e);
  }
}
