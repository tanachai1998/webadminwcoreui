import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {YearComponent} from './year.component';

const routes: Routes = [ {
  path: '',
  component:YearComponent,
  data: {
    title: 'ปี'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YearRoutingModule { }
