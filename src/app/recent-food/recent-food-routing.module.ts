import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentFoodPage } from './recent-food.page';

const routes: Routes = [
  {
    path: '',
    component: RecentFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentFoodPageRoutingModule {}
