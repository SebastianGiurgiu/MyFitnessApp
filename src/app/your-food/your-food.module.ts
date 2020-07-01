import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourFoodPageRoutingModule } from './your-food-routing.module';

import { YourFoodPage } from './your-food.page';
import { ShowFoodOfMealComponent } from './show-food-of-meal/show-food-of-meal.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourFoodPageRoutingModule,
    SharedModule
  ],
  declarations: [YourFoodPage],
})
export class YourFoodPageModule {}
