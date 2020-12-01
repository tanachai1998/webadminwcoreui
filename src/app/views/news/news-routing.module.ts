import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'หัวข้อข่าว'
    },
    children: [
      {
        path: '',
        redirectTo: 'news'
      },

      {
        path: 'news',
        component: NewsComponent,
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
export class NewsRoutingModule { }
