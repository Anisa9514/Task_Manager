import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
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
import { filterChangeTypes } from '../../app.constants';

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

  // Inputs
    // Keyword Search
    searchInput: string;
    searchNameCheckbox: boolean;
    searchDescriptionCheckbox: boolean;

    // Tags
    tags$: Observable<string[]>;
    filteredTags: string[];
    tagSearchInput: string;

    // Date
    hoveredDate: NgbDate;
    fromDate: NgbDate;
    toDate: NgbDate;
  
  constructor(
    public el: ElementRef,
    private tasksService : TasksService,
    public calendar: NgbCalendar
  ) { 
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.fromDate = null;
    this.toDate = null;
  }

  ngOnInit() {
    this.tagSearchInput = '';
    this.tags$ = this.tasksService.tags;
    this.tags$.subscribe((data) => {
      this.filteredTags = this.filterTags(data);
    });

    this.searchInput = '';
    this.searchNameCheckbox = true;
    this.searchDescriptionCheckbox = true;
  }
  
  filterTags(data: string[]): string[]{
    return data.filter( tag => tag.includes(this.tagSearchInput) );
  }

  collapseForm(){
    this.emitCollapseForm.emit();
  }

  isHovered = (date: NgbDate) => this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  isInside = (date: NgbDate) => date.after(this.fromDate) && date.before(this.toDate);
  isRange = (date: NgbDate) => date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date)

  // Input changes
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.emitChange.emit({filterType: filterChangeTypes.fromDate, filterValue: this.fromDate});
    this.emitChange.emit({filterType: filterChangeTypes.toDate, filterValue: this.toDate});
  }
  
  clearDatepicker(){
    this.fromDate = null;
    this.toDate = null;
    this.emitChange.emit({filterType: filterChangeTypes.fromDate, filterValue: this.fromDate});
    this.emitChange.emit({filterType: filterChangeTypes.toDate, filterValue: this.toDate});
  }

  onTagSelectionChange(e){
    // e.includeArr || e.excludeArr
    this.emitChange.emit({filterType: filterChangeTypes.includeTags, filterValue: e.includeArr});
    this.emitChange.emit({filterType: filterChangeTypes.excludeTags, filterValue: e.excludeArr});
  }

  onSearchInputChange(e){
    this.emitChange.emit({filterType: filterChangeTypes.searchInput, filterValue: this.searchInput});
  }

  titleCheckboxChange(e){
    console.log('title');
    this.emitChange.emit({filterType: filterChangeTypes.titleCheck, filterValue: this.searchNameCheckbox});
  }

  descriptionCheckboxChange(e){
    console.log('description');
    this.emitChange.emit({filterType: filterChangeTypes.descriptionCheck, filterValue: this.searchDescriptionCheckbox});
  }
}
