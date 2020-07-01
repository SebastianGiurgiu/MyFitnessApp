import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodHistoryPageRoutingModule } from './food-history-routing.module';

import { FoodHistoryPage } from './food-history.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodHistoryPageRoutingModule,
    SharedModule
  ],
  declarations: [FoodHistoryPage]
})
export class FoodHistoryPageModule {}
