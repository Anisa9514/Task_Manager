import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tiles-container-wrapper',
  templateUrl: './tiles-container-wrapper.component.html',
  styleUrls: ['./tiles-container-wrapper.component.css']
})
export class TilesContainerWrapperComponent implements OnInit {
  public tasks = [];
  constructor(private tasksService : TasksService) { }

  ngOnInit() {
    this.tasks = this.tasksService.tasks;
  }

  public getTasks(state: string){
    return this.tasks.filter((task) => task.state === state);
  }
}
