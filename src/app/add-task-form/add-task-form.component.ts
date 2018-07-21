import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {

  @ViewChild('slider') slider : ElementRef;

  constructor(
    public el: ElementRef,
    private tasksService : TasksService
  ) { }

  ngOnInit() {
    this.tasks = this.tasksService.tasks;
    console.log(this.slider);
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

  possibleUsers: string[] = [
    'Anisa',
    'Isabel',
    'Albert',
    'Raphael',
  ]

  // Form Inputs
  title : string = '';
  description: string = '';
  dueDate : {"year" : number, "month" : number, "day" : number};
  timeEstimate : number;
  state: string = 'Not Assigned';
  progressEstimate : number = 0;
  selectedTags: string[] = [];
  selectedAssignees: string[] = [];

  fillSelectedTags(tags : string[]){
    this.selectedTags = tags;
  }

  fillSelectedAssignees(assignees : string[]){
    this.selectedAssignees = assignees;
  }

  collapseForm(){
    this.emitCollapseForm.emit();
  }

  submitForm(){
    let newTask : Task = new Task(
      this.title,
      this.description,
      this.dueDate,
      this.timeEstimate,
      this.state,
      this.progressEstimate,
      this.selectedTags,
      this.selectedAssignees
    )

    this.tasksService.addTask(newTask);
    this.collapseForm();
  }

}
