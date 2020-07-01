import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { MealService, Meal } from 'src/app/home/food/meal-service.service';
import { DayService, Day } from 'src/app/home/food/day.service';
import { LoadingController, IonItemSliding, NavController } from '@ionic/angular';
import { Food } from 'src/app/home/food/food-service.service';

@Component({
  selector: 'app-show-food-of-meal',
  templateUrl: './show-food-of-meal.component.html',
  styleUrls: ['./show-food-of-meal.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ShowFoodOfMealComponent implements OnInit, OnChanges {

  ngOnChanges(): void {
    this.isLoading = true;
    this.mealService.getMeal(this.idMeal)
      .subscribe(val => {
        this.meal = val;
        this.foods = this.meal.foods;
        this.quantities = this.meal.quantities;
        this.calories = this.calories;
        this.isLoading = false;
      });
  }

  constructor(
    private mealService: MealService,
    private dayService: DayService,
    private navController: NavController
  ) { }

  @Input()
  idMeal: string;

  @Input()
  readonly: boolean;

  @Input()
  day: Day;


  foods: Food[];
  quantities: number[];
  calories: number;
  meal: Meal;
  isLoading = false;


  ngOnInit() {
  }

  onDeleteFoodFromMeal(food: Food, quantity: number, slidingEl: IonItemSliding) {
    slidingEl.close();
    const oldfoods = this.foods;
    console.log("Old foods : ");
    console.log(oldfoods);
      this.mealService.deleteFoodFromMeal(this.meal, food)
      .subscribe(val => {
        this.meal = val;
        this.foods = this.meal.foods;
        this.quantities = this.meal.quantities;
        this.calories = this.calories;
        console.log("Actual foods : ");
        console.log(this.foods);
        if(oldfoods === this.foods) {
          alert('Eroare la stergere');
        }
      });
      this.dayService.setNrCal(this.day, -((quantity / 100) * food.calories));
    }

}
