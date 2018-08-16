import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Input('tag') tag;
  @Output('change') change: EventEmitter<any> = new EventEmitter<any>();
  state;
  constructor() { }

  ngOnInit() {
  }

  onClick(){
    if(this.state === 'include'){
      this.state = 'exclude';
    } else if (this.state === 'exclude'){
      this.state = 'none';
    } else {
      this.state = 'include';
    }
    this.change.emit({tag: this.tag, state: this.state});
  }
}
