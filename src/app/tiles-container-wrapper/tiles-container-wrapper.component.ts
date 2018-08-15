import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tiles-container-wrapper',
  templateUrl: './tiles-container-wrapper.component.html',
  styleUrls: ['./tiles-container-wrapper.component.css']
})
export class TilesContainerWrapperComponent implements OnInit{
  @Input('tasks') tasks: Task[];
  showEditModal: boolean;
  showDeleteModal: boolean;
  modalTask: Task;

  constructor(private tasksService : TasksService) { }

  ngOnInit(){
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.modalTask = new Task();
  }

  public filterTasksByState(state: string){
    return this.tasks.filter((task) => task.state === state);
  }

  onEditClicked(e){
    this.showEditModal = true;
    this.modalTask = e;
  }

  onDeleteClicked(e){
    this.showDeleteModal = true;
    this.modalTask = e;
  }

  onConfirmDelete(){
    this.tasksService.removeTask(this.modalTask);
  }
}
