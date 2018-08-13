import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tiles-container-wrapper',
  templateUrl: './tiles-container-wrapper.component.html',
  styleUrls: ['./tiles-container-wrapper.component.css']
})
export class TilesContainerWrapperComponent {
  @Input() tasks: Task[];
  constructor(private tasksService : TasksService) { }

  public filterTasksByState(state: string){
    return this.tasks && this.tasks.filter((task) => task.state === state);
  }
}
