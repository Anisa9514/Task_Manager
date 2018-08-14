import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit{
  @Input() task : Task;
  showDropdown: boolean;

  constructor() { }

  ngOnInit(){
    this.showDropdown = false;
  }

  toggleDropdown(e){
    e.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  onEditTask(){

  }

  onDeleteTask(){
    
  }

  onClickedOutside(e){
    this.showDropdown = false;
  }
}
