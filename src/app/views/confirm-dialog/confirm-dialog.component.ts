import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  title: string;
  message: string;
  options: Array<any>;
  icon: string = null;
  answer: string = "";
  cssStringVar: string = 'ml-1 btn ';
  cssStringVarIcon: string = 'delete-icon '


  
  constructor(
    public bsModalRef: BsModalRef,
  ) {
    // bsModalRef.setClass('modal-sm modal-dialog-centered');
  }
  // gray modal-md modal-dialog-centered
  respond(answer: string) {
    this.answer = answer;
    this.bsModalRef.hide();
  }

  getClassButton(classed) {
    return this.cssStringVar + classed
  }
  getClassIcon(icon) {
    let recive_icon = icon != null ? icon : 'icon-info'
    // console.log(this.cssStringVarIcon + recive_icon);

    return this.cssStringVarIcon + recive_icon

  }

}
