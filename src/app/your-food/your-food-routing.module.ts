import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourFoodPage } from './your-food.page';

const routes: Routes = [
  {
    path: '',
    component: YourFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourFoodPageRoutingModule {}
