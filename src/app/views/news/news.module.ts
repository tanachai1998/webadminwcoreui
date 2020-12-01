import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NewsComponent } from "./news.component";
import { DataTablesModule } from 'angular-datatables';
import { NewsRoutingModule } from "./news-routing.module";
import { NgSelectModule } from "@ng-select/ng-select";


@NgModule({
  declarations: [NewsComponent,],
  imports: [
    CommonModule,
     NewsRoutingModule,
     FormsModule,
     ReactiveFormsModule,
     ModalModule.forRoot(),
     DataTablesModule,
     NgSelectModule
  ],
  exports :[
    DataTablesModule,
  ]

})
export class NewsModule {}
