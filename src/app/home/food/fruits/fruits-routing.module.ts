import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FruitsPage } from './fruits.page';
import { ModalAddToMealPage } from '../modal-add-to-meal/modal-add-to-meal.page';

const routes: Routes = [
  {
    path: ':type',
    component: FruitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FruitsPageRoutingModule {}
