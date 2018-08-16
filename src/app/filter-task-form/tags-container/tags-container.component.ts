import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tags-container',
  templateUrl: './tags-container.component.html',
  styleUrls: ['./tags-container.component.css']
})
export class TagsContainerComponent implements OnInit {

  @Input('tags') tags;
  @Output('change') change: EventEmitter<any> = new EventEmitter<any>();

  includedTags: string[];
  excludedTags: string[];

  constructor() { }

  ngOnInit() {
    this.includedTags = [];
    this.excludedTags = [];
  }

  onTagSelection(e){

    let index;
    switch(e.state){
      case 'include':
        this.includedTags.push(e.tag);
      break;
      case 'exclude':
        index = this.includedTags.indexOf(e.tag);
        if(index !== -1){
          this.includedTags.splice(index, 1);
        }
        this.excludedTags.push(e.tag);
      break;
      default:
        index = this.excludedTags.indexOf(e.tag);
        if(index !== -1){
          this.excludedTags.splice(index, 1);
        }
    }
    this.change.emit({includeArr: this.includedTags, excludeArr: this.excludedTags});
  }

}
