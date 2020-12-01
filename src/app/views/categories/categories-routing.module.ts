import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'หมวดหมู่'
    },

    children: [
      {
        path: '',
        redirectTo: 'categories'
      },
      {
        path: 'types',
        loadChildren: () => import('./types/types.module').then(m => m.TypesModule)
      },
      {
        path: 'categories',
        component: CategoriesComponent,
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
export class CategoriesRoutingModule { }
