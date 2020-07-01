import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodPageRoutingModule } from './food-routing.module';

import { FoodPage } from './food.page';
import { ModalAddToMealPage } from './modal-add-to-meal/modal-add-to-meal.page';
import { ShowFoodDetailsComponent } from 'src/app/shared/show-food-details/show-food-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodPageRoutingModule
  ],
  declarations: [FoodPage]
})
export class FoodPageModule {}
