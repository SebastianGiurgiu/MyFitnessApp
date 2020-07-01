import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodHistoryPage } from './food-history.page';

const routes: Routes = [
  {
    path: '',
    component: FoodHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodHistoryPageRoutingModule {}
