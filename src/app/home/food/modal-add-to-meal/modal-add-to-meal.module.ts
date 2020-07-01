import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddToMealPageRoutingModule } from './modal-add-to-meal-routing.module';

import { ModalAddToMealPage } from './modal-add-to-meal.page';
import { ShowFoodDetailsComponent } from 'src/app/shared/show-food-details/show-food-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddToMealPageRoutingModule
  ],
  declarations: [ModalAddToMealPage,ShowFoodDetailsComponent],
  entryComponents: [ShowFoodDetailsComponent]
})
export class ModalAddToMealPageModule {}
