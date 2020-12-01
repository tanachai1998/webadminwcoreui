import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import {CategoriesComponent} from './categories.component'
import { CategoriesRoutingModule } from './categories-routing.module';

// import {GetData} from '../../get-data';

@NgModule({
  declarations: [CategoriesComponent,],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DataTablesModule,

  ],
  exports :[
    DataTablesModule,
  ]


})
export class CategoriesModule { }
