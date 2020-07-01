import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'food',
        loadChildren: () => import('./food/food.module').then( m => m.FoodPageModule)
      },
      {
        path: 'calculator',
        loadChildren: () => import('./calculator/calculator.module').then( m => m.CalculatorPageModule)
      },
      {
        path: 'food-history',
        loadChildren: () => import('./food-history/food-history.module').then( m => m.FoodHistoryPageModule)
      },
      {
        path: 'progress',
        loadChildren: () => import('./progress/progress.module').then( m => m.ProgressPageModule)
      },
      {
        path: 'articles',
        loadChildren: () => import('./articles/articles.module').then( m => m.ArticlesPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
