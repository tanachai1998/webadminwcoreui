import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TypesComponent} from './types.component'
// import {DatasComponent} from './datas/datas.component';
const routes: Routes = [
  {
  path: '',
  data: {
    title: 'ประเภท'
  },
  // component: TypesComponent,
  children: [
    {
      path: '',
      redirectTo: 'types'
    },
    {
      path: 'data',
      loadChildren: () => import('./data/data.module').then(m=>m.DataModule)
      // component: DataComponent
    },
    {
      path: 'types',
      component: TypesComponent,
      data: {
        title: ''
      }
    },
  ]
}];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypesRoutingModule { }
