import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input('title') title;
  @Input('confirmBtnTxt') confirmBtn;
  @Input('cancelBtnTxt') cancelBtn;
  @Input('showModal') show;
  @Input('showBtns') showBtns;
  @Output('confirm') emitConfirm = new EventEmitter();
  @Output('cancel') emitCancel = new EventEmitter();
  @Output('close') emitClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickConfirm(e: any){
    e.stopPropagation();
    this.emitConfirm.emit();
    this.emitClose.emit();
  }

  onClickCancel(e: any){
    e.stopPropagation();
    this.emitCancel.emit();
    this.emitClose.emit();
  }

  onClose(e: any){
    console.log('on close');
    e.stopPropagation();
    this.emitClose.emit();
  }
}
