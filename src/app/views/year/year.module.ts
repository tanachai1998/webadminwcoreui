import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { YearComponent } from "./year.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { YearRoutingModule } from "./year-routing.module";
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [YearComponent],
  imports: [
    CommonModule,
    YearRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DataTablesModule,
  ],
  exports: [DataTablesModule],
})
export class YearModule {}
