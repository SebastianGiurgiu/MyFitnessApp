import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowFoodOfMealComponent } from 'src/app/your-food/show-food-of-meal/show-food-of-meal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ShowFoodOfMealComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ShowFoodOfMealComponent
  ]
})
export class SharedModule { }
