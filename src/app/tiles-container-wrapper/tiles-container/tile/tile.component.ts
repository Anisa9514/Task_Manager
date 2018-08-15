import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../models/task.model';
import { TasksService } from '../../../../services/tasks.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit{
  @Input() task : Task;
  @Output('editClicked') onEditClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output('deleteClicked') onDeleteClicked: EventEmitter<any> = new EventEmitter<any>();
  showDropdown: boolean;

  constructor(private tasksService: TasksService) { }

  ngOnInit(){
    this.showDropdown = false;
  }

  toggleDropdown(e){
    e.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  onEditTask(){
    this.showDropdown = false;
    this.onEditClicked.emit(this.task);
  }
  
  onDeleteTask(){
    this.showDropdown = false;
    this.onDeleteClicked.emit(this.task);
  }

  onClickedOutside(e){
    this.showDropdown = false;
  }
}
