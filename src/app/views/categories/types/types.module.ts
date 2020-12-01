import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { DataTablesModule } from "angular-datatables";
import { NgSelectModule } from "@ng-select/ng-select";

// import { TableFilterPipe } from './filter-table.pipe';

import { TypesComponent } from "./types.component";

import { TypesRoutingModule } from "./types-routing.module";
import { DataComponent } from "./data/data.component";

@NgModule({
  declarations: [TypesComponent],
  imports: [
    CommonModule,
    TypesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DataTablesModule,
    NgSelectModule,
  ],
  exports: [
    // DataTablesModule,
  ],
})
export class TypesModule {}
