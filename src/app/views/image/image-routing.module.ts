import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageComponent} from './image.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'รูปส่วนงาน'
    },
    children: [
      {
        path: '',
        redirectTo: 'image'
      },
      // {
      //   path: 'new-info/:id',
      //   loadChildren: () => import('./new-info/new-info.module').then(m => m.NewInfoModule)
      // },
      {
        path: 'image',
        component: ImageComponent,
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
export class ImageRoutingModule { }
