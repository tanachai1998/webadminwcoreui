import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
  ) { }
  // https://stackblitz.com/edit/ngx-modal?file=src%2Fapp%2Fsome%2Fsome.component.html
  confirm(title: string, message: string, options: Array<any>, icon: string = null): Observable<string> {
    const initialState = {
      title: title,
      message: message,
      options: options,
      class: "gray modal-md modal-dialog-centered",
      icon: icon
      // Object.assign({}, )
      // class: "gray modal-md modal-dialog-centered"
    };
    this.bsModalRef = this.bsModalService.show(ConfirmDialogComponent, { class: 'modal-dialog-centered', initialState });

    return new Observable<string>(this.getConfirmSubscriber());
  }

  private getConfirmSubscriber() {
    return (observer) => {
      //console.log(this.bsModalRef.content.answer);

      const subscription = this.bsModalService.onHidden
        .subscribe((reason: string) => {
          observer.next(this.bsModalRef.content.answer);
          observer.complete();
        });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }
}
