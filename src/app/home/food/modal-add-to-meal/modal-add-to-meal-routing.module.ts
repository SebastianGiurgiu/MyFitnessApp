import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddToMealPage } from './modal-add-to-meal.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddToMealPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddToMealPageRoutingModule {}
