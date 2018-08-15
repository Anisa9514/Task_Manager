import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/task.model';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-tiles-container',
  templateUrl: './tiles-container.component.html',
  styleUrls: ['./tiles-container.component.css'],
})
export class TilesContainerComponent implements OnInit {
  @Input() tasks;
  @Input() title;
  @Output('editClicked') editClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output('deleteClicked') deleteClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    
  }

  onEditClicked(e){
    this.editClicked.emit(e);
  }

  onDeleteClicked(e){
    this.deleteClicked.emit(e);
  }

  onDataDrop(e: any) {
    if(e.dragData.state === this.title){
      return;
    }
    let req = new Task();
    req.deserialize(e.dragData);
    req.state = this.title;
    this.tasksService.updateTask(req);
  }

}
