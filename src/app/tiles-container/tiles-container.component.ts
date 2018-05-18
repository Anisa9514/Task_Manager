import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-tiles-container',
  templateUrl: './tiles-container.component.html',
  styleUrls: ['./tiles-container.component.css']
})
export class TilesContainerComponent implements OnInit {

  constructor(
    private tasksService : TasksService
  ) { }
  
  tasks : Task[];

  ngOnInit() {
    this.tasks = this.tasksService.tasks;
  }

}
