import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tiles-container-wrapper',
  templateUrl: './tiles-container-wrapper.component.html',
  styleUrls: ['./tiles-container-wrapper.component.css']
})
export class TilesContainerWrapperComponent implements OnInit{
  @Input('tasks') tasks: Task[];
  constructor(private tasksService : TasksService) { }

  ngOnInit(){
  }

  public filterTasksByState(state: string){
    return this.tasks.filter((task) => task.state === state);
  }
}
