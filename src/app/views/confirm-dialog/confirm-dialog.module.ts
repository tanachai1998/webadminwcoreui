import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog.service';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [AlertModule, ConfirmDialogComponent],
  providers: [ConfirmDialogService],
  entryComponents: [ConfirmDialogComponent]
})
export class ConfirmDialogModule { }
