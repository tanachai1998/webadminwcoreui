import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';

import {DataComponent} from './data.component'
import { DataRoutingModule } from './data-routing.module';


@NgModule({
  declarations: [DataComponent],
  imports: [
    CommonModule,
    DataRoutingModule,
    FormsModule,
    HttpClientModule,
    // DataTableModule,
    ReactiveFormsModule,
    DataTablesModule,
    ModalModule.forRoot()

  ],
  exports :[
    DataTablesModule,
  ]
})
export class DataModule { }
