import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpClientModule } from '@angular/common/http';
import { DataFilterPipe } from './datafilterpipe';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


// import { DataTableComponent } from './datatable.component';

// Routing
import { DatatableRoutingModule } from './datatable-routing.module';
//
@NgModule({
  imports: [
    DatatableRoutingModule,
    CommonModule,
    DataTableModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot()

  ],
  declarations: [
    // DataTableComponent,
    DataFilterPipe
  ]
})
export class DatatableInitModule { }
