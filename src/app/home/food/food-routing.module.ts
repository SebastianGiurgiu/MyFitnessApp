import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodPage } from './food.page';

const routes: Routes = [
  {
    path: '',
    component: FoodPage
  },
  {
    path: 'type-food',
    loadChildren: () => import('./fruits/fruits.module').then( m => m.FruitsPageModule)
  },
  {
    path: 'modal-add-to-meal',
    loadChildren: () => import('./modal-add-to-meal/modal-add-to-meal.module').then( m => m.ModalAddToMealPageModule)
  },  {
    path: 'modal-add-food',
    loadChildren: () => import('./modal-add-food/modal-add-food.module').then( m => m.ModalAddFoodPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodPageRoutingModule {}
