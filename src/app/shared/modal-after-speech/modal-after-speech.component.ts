import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Food, FoodService } from 'src/app/home/food/food-service.service';
import { Day, DayService } from 'src/app/home/food/day.service';
import { Meal, MealService } from 'src/app/home/food/meal-service.service';
import { ModalController, ToastController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-modal-after-speech',
  templateUrl: './modal-after-speech.component.html',
  styleUrls: ['./modal-after-speech.component.scss'],
})
export class ModalAfterSpeechComponent implements OnInit {

  foodsAndQuatities: { quantity: number, foodName: string }[] = []

  selectedFoods: { food: Food, quantity: number }[] = [];

  day: Day;
  meal: Meal;
  chooseMeal: any;
  currentDayId: string;

  constructor(private modalController: ModalController,
    private mealService: MealService,
    private dayService: DayService,
    private foodService: FoodService) { }

  ngOnInit() {    
    this.dayService.getCurrentDayId().pipe(
      map(id => {
        return this.currentDayId = id
      }),
      switchMap(id => {
        if (id !== null && id !== undefined) {
          return this.dayService.getDay(id)
        }
      })
    ).subscribe(val => {
      this.day = val;
    })


    this.foodsAndQuatities.forEach(food => {
      this.foodService.getFoodAfterName(food.foodName).subscribe(
        res => {
          this.selectedFoods.push(
            {
              food: res[0],
              quantity: food.quantity
            });
        }
      )
    })
  }

  changeFieldsFormMeal() {
    this.selectedFoods.forEach(selectedFood => {
      let nbOfCalFood = selectedFood.quantity * selectedFood.food.calories / 100;
      this.meal.foods.push(selectedFood.food);
      this.meal.quantities.push(selectedFood.quantity);
      this.meal.calories += nbOfCalFood;
      this.mealService.updateMeal(this.meal);
      this.dayService.setNrCal(this.day, nbOfCalFood);
    })
  }

  AddToMeal() {

    switch (this.chooseMeal) {
      case 'lunch': {
        this.mealService.getMeal(this.day.idLunch).subscribe(val => {
          this.meal = val;
          this.changeFieldsFormMeal();
        })
        break;
      }
      case 'dinner': {
        this.mealService.getMeal(this.day.idDinner).subscribe(val => {
          this.meal = val;
          this.changeFieldsFormMeal();
        })
        break;
      }
      case 'snacks': {
        this.mealService.getMeal(this.day.idSnack).subscribe(val => {
          this.meal = val;
          this.changeFieldsFormMeal();
        })
        break;
      }
      default: {
        this.mealService.getMeal(this.day.idBreakfast).subscribe(val => {
          this.meal = val;
          this.changeFieldsFormMeal();
        })
        break;
      }
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  continue() {
    this.AddToMeal();
    this.modalController.dismiss('succes', 'cancel');
  }


}
