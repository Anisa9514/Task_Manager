import { Component,
         OnInit,
         Input,
         Output, 
         EventEmitter, 
         ElementRef, 
         ViewChild,
         Renderer2
        } from '@angular/core';


@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.css']
})
export class ChipInputComponent implements OnInit {

  @Input() options : string[];
  @Input('inputPlaceholder') helperPlaceHolder : string;
  @Output() emitSelectedOpts = new EventEmitter<string[]>();

  @ViewChild('optionsElem') optionsElem : ElementRef;

  filteredOpts : string[] = [];
  selectedOpts : string[] = [];
  areOptsVisible : boolean = false;
  inputValue : string = '';

  chips : string[] = [];

  constructor(
    private renderer : Renderer2
  ) { }

  ngOnInit() {
  }

  private optIndex = -1;
  // Show possible autocomplete options
  showOpts(e : Event){
    let value : string = (<HTMLInputElement>e.target).value.toLowerCase().trim();
    let key: string = (<KeyboardEvent>e).key;
    this.areOptsVisible = false;

    if (value == ""){
      this.optIndex = -1;
      return null;
    }

    if( key == "Enter"){
      var children = this.optionsElem.nativeElement.children;
      var val = (this.optIndex != -1) ? children[this.optIndex].textContent.toLowerCase().trim() : value;

      this.optIndex = -1;
      this.selectOption(val);
      this.inputValue = '';
      return null;
    }

    if( key == "ArrowDown"){
      var children = this.optionsElem.nativeElement.children;
      
      if(this.optIndex > -1) this.renderer.removeClass(children[this.optIndex], 'hover');
      this.optIndex = (++this.optIndex) < (children.length) ? this.optIndex : (children.length - 1);
      this.renderer.addClass(children[this.optIndex], 'hover');
    }

    if( key == "ArrowUp"){
      var children = this.optionsElem.nativeElement.children;

      if(this.optIndex > -1) this.renderer.removeClass(children[this.optIndex], 'hover');
      this.optIndex = (--this.optIndex) >= -1 ? this.optIndex : -1;
      if(this.optIndex > -1) this.renderer.addClass(children[this.optIndex], 'hover');     
      
    }

    this.areOptsVisible = true;
    this.filteredOpts = this.options.filter((posOpt) => {return posOpt.includes(value)})
  }

  // Remove All Hover Classes
  removeHoverClass(){
    console.log("remove called");
    var children = this.optionsElem.nativeElement.children;
    if(this.optIndex != -1){
      this.renderer.removeClass(children[this.optIndex], 'hover');
      this.optIndex = -1;
    }
  }

  // Hide options
  hideOpts(){
    this.areOptsVisible = false;
  }

  // Create a chip with the selected option
  selectOption(option : string){
    if(this.chips.includes(option) === false){
      this.chips.push(option);  // only push if not in array
    }
    this.inputValue = '';
    this.emitSelections();

  }

  // Remove Chip
  removeChip(chip : string){
    let index : number = this.chips.indexOf(chip);
    if(index > -1){
      this.chips.splice(index, 1);
    }
    this.emitSelections();
  }

  // Send selections
  emitSelections(){
    this.emitSelectedOpts.emit(this.chips);
  }
}
