import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddFoodPageRoutingModule } from './modal-add-food-routing.module';

import { ModalAddFoodPage } from './modal-add-food.page';
import { ShowFoodDetailsComponent } from 'src/app/shared/show-food-details/show-food-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModalAddFoodPageRoutingModule
  ],
  declarations: [ModalAddFoodPage]
})
export class ModalAddFoodPageModule {}
