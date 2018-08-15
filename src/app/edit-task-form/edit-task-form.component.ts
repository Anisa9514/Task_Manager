import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, Input, OnChanges } from '@angular/core';
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
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.css'],
})
export class EditTaskFormComponent implements OnInit, OnChanges {
  @Input() task: Task;
  @Output('collapse') emitCollapseForm = new EventEmitter(); 
  @Output('editTaskSuccess') emitEditTaskSuccess = new EventEmitter();
  @Output('editTaskFail') emitEditTaskFail = new EventEmitter();
  
  states: string[] = States;
  possibleTags: string[] = [];
  
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
    this.tasksService.getAllTags().subscribe(
      (res) => {this.possibleTags = res;}
    );
  }

  ngOnChanges() {
    let date = new Date(this.task.dueDate);
    this.title = this.task.title;
    this.description = this.task.description;
    this.dueDate = {
      "year": date.getFullYear(),
      "month": date.getMonth() + 1,
      "day": date.getDate()
    }
    this.state = this.task.state;
    this.selectedTags = this.task.tags;
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

  taskChanged(task1: Task, task2: Task){
    let task1DueDate = new Date(task1.dueDate);

    return(
      task1.title !== task2.title ||
      task1.description !== task2.description ||
      task1DueDate.getFullYear() !== task2.dueDate.getFullYear() ||
      task1DueDate.getMonth() !== task2.dueDate.getMonth() ||
      task1DueDate.getDate() !== task2.dueDate.getDate() ||
      task1.state !== task2.state ||
      !task2.tags.every((t2tag) => task1.tags.includes(t2tag)) ||
      !task1.tags.every((t1tag) => task2.tags.includes(t1tag))
    );
  }
  submitForm(){
    // TODO: Validate form. Do not allow submission without title and description
    let newTask : Task = new Task({
      _id: this.task._id,
      title: this.title,
      description: this.description,
      dueDate: new Date(this.dueDate.year, this.dueDate.month - 1, this.dueDate.day),
      state: this.state,
      tags: this.selectedTags,
    })

    if(this.taskChanged(this.task, newTask)){
      this.tasksService.updateTask(newTask);
    }
    this.collapseForm();
    this.clearInputs();
  }

}
