import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {
  @Output('collapse') emitCollapseForm = new EventEmitter(); 

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

  possibleUsers: string[] = [
    'Anisa',
    'Isabel',
    'Albert',
    'Raphael',
  ]

  selectedTags: string[] = [];

  fillSelectedOptions(tags : string[]){
    console.log("event emitted and passed");
    this.selectedTags = tags;
  }

  collapseForm(){
    this.emitCollapseForm.emit();
  }
  constructor() { }

  ngOnInit() {
  }
}
