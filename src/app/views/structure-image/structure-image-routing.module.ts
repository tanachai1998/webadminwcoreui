import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StructureImageComponent} from './structure-image.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'รูปโครงสร้าง'
    },
    children: [
      {
        path: '',
        redirectTo: 'structure-image'
      },
      // {
      //   path: 'new-info/:id',
      //   loadChildren: () => import('./new-info/new-info.module').then(m => m.NewInfoModule)
      // },
      {
        path: 'structure-image',
        component: StructureImageComponent,
        data: {
          title: ''
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructureImageRoutingModule { }
