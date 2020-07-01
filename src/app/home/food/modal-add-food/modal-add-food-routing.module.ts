import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddFoodPage } from './modal-add-food.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddFoodPageRoutingModule {}
