import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Food } from '../food-service.service';
import { MealService, Meal } from '../meal-service.service';
import { Day, DayService } from '../day.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-modal-add-to-meal',
  templateUrl: './modal-add-to-meal.page.html',
  styleUrls: ['./modal-add-to-meal.page.scss'],
})
export class ModalAddToMealPage implements OnInit {

  @Input()
  selectedFood: Food;

  @Input()
  justInfo: boolean;

  nbOfCalFood: number;
  quantOfFood: number;
  day: Day;
  meal: Meal;
  chooseMeal: any;
  currentDayId: string;

  constructor(private modalController: ModalController,
    private mealService: MealService,
    private dayService: DayService) { }

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
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  changeFieldsFormMeal() {
    this.nbOfCalFood = this.quantOfFood * this.selectedFood.calories / 100;
    this.meal.foods.push(this.selectedFood);
    this.meal.quantities.push(this.quantOfFood);
    this.meal.calories += this.nbOfCalFood;
    this.mealService.updateMeal(this.meal);
    this.dayService.setNrCal(this.day,this.nbOfCalFood);

    const data = {
      foodName: this.selectedFood.name,
      foodQuantity: this.quantOfFood,
      foodCalories: this.nbOfCalFood
    };
    this.modalController.dismiss(data, 'cancel');
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

}
