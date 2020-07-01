import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Food, FoodService } from '../home/food/food-service.service';
import { ModalController } from '@ionic/angular';
import { ModalAddToMealPage } from '../home/food/modal-add-to-meal/modal-add-to-meal.page';


@Component({
  selector: 'app-recent-food',
  templateUrl: './recent-food.page.html',
  styleUrls: ['./recent-food.page.scss'],
})
export class RecentFoodPage implements OnInit {
  foods: Observable<Food[]>;
 
  constructor(
    private foodService: FoodService,
    private modalController: ModalController) {}

  ngOnInit() {
      this.foods = this.foodService.getUnapprovedFoods();
    }

    Approved(food: Food) {
      this.foodService.approveFood(food);
    }

    Delete(food: Food) {
      this.foodService.deleteFood(food.id);
    }

    async openModalForFood(food: Food) {
      const modal = await this.modalController.create({
        component: ModalAddToMealPage,
        componentProps: { selectedFood: food }
      });  
      modal.present();
    }

  


}




