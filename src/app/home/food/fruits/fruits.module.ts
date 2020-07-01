import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FruitsPageRoutingModule } from './fruits-routing.module';

import { FruitsPage } from './fruits.page';
import { FoodsFilterPipe } from './foods-filter.pipe';
import { ModalAddToMealPage } from '../modal-add-to-meal/modal-add-to-meal.page';
import { ModalAddToMealPageModule } from '../modal-add-to-meal/modal-add-to-meal.module';
import { ModalAddFoodPage } from '../modal-add-food/modal-add-food.page';
import { ModalAddFoodPageModule } from '../modal-add-food/modal-add-food.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddToMealPageModule,
    ModalAddFoodPageModule,
    FruitsPageRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  declarations: [FruitsPage, FoodsFilterPipe],
  entryComponents: [ModalAddToMealPage, ModalAddFoodPage],
  providers: [Camera, File, WebView]
})
export class FruitsPageModule { }
