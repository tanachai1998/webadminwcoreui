import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { StructureImageComponent } from "./structure-image.component";
import { StructureImageRoutingModule } from "./structure-image-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from "@ng-select/ng-select";


@NgModule({
  declarations: [StructureImageComponent],
  imports: [
    CommonModule,
    StructureImageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DataTablesModule,

  ],
  exports :[
    // DataTablesModule,
  ]

})
export class StructureImageModule {}
