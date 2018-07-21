import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
}from '@angular/animations';

@Component({
  selector: 'app-tiles-container',
  templateUrl: './tiles-container.component.html',
  styleUrls: ['./tiles-container.component.css'],
  animations: [
    trigger('visibility', [
      state('yes', 
        style({
          transform: 'translateX(0%)',
        })
      ),
      state('no', 
        style({
          transform: 'translateX(50%)',
        })
      ),
      transition('yes => no', animate('0.5s ease-in')),
      transition('no => yes', animate('0.5s ease-out'))
    ])
  ]
})
export class TilesContainerComponent implements OnInit {
  @Input() showAddForm;
  constructor(
    private tasksService : TasksService
  ) { }
  
  tasks : Task[];

  ngOnInit() {
    this.tasks = this.tasksService.tasks;
  }

}
