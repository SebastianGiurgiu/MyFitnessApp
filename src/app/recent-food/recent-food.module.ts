import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentFoodPageRoutingModule } from './recent-food-routing.module';

import { RecentFoodPage } from './recent-food.page';
import { ModalAddToMealPage } from '../home/food/modal-add-to-meal/modal-add-to-meal.page';
import { ModalAddToMealPageModule } from '../home/food/modal-add-to-meal/modal-add-to-meal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentFoodPageRoutingModule,
    ModalAddToMealPageModule
  ],
  declarations: [RecentFoodPage],
  entryComponents: [ModalAddToMealPage]
})
export class RecentFoodPageModule {}
