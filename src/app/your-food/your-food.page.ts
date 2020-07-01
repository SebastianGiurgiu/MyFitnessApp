import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MealService, Meal } from '../home/food/meal-service.service';
import { Observable } from 'rxjs';
import { Food } from '../home/food/food-service.service';
import { LoadingController, IonItemSliding } from '@ionic/angular';
import { DayService, Day } from '../home/food/day.service';
import { formatDate } from '@angular/common';
import { ShowFoodOfMealComponent } from './show-food-of-meal/show-food-of-meal.component';
import { AuthService } from '../auth/auth.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-your-food',
  templateUrl: './your-food.page.html',
  styleUrls: ['./your-food.page.scss'],
})
export class YourFoodPage implements OnInit {
 
  constructor(private mealService: MealService,
    private dayService: DayService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
  ) { }

  foods: Food[];
  quantities: number[];
  calories: number;
  meal: Meal;
  isLoading = false;
  day: Day;
  days: Day[];
  userId: string;

  ngOnInit() {

    this.isLoading = true
    this.authService.userId.pipe(
      map(userId => {
        console.log(userId);
        return userId
      }),
      switchMap(userId => {
        if (userId !== null && userId !== undefined) {
          this.userId = userId;
          return this.dayService.getDaysByUser(userId);
        }
      })
    ).subscribe(
      val => {
        this.isLoading = false;
        const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
        this.days = val
        var found = false
        this.days.forEach(day => {
          if (day.date === today) {
            this.day = day
            this.dayService.storeDayData(this.day.id)
            found = true
          }
        })

        if (!found) {
          this.addNewDay().pipe(
            map(day => {
              this.day = day
              this.dayService.storeDayData(this.day.id)
            }));
        } else {
          console.log("exista deja zi")
        }
      })

  }

  ionViewWillEnter() {

    this.isLoading = true
    this.authService.userId.pipe(
      map(userId => {
        return userId
      }),
      switchMap(userId => {
        if (userId !== null && userId !== undefined) {
          return this.dayService.getDaysByUser(userId)
        }
      })
    ).subscribe(
      val => {
        this.isLoading = false;
        const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
        this.days = val
        var found = false
        this.days.forEach(day => {
          if (day.date === today) {
            this.day = day
            this.dayService.storeDayData(this.day.id)
            found = true
          }
        })
      })
  }

  onDeleteFoodFromMeal(food: Food, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl.create({
      message: 'Deleting...'
    }).then(
      loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.mealService.deleteFoodFromMeal(this.meal, food);
          this.dayService.setNrCal(this.day,-food.calories)
          this.ionViewWillEnter();
          loadingEl.dismiss();
        }, 2000);
      }
    );
  }

  addNewDay() {
    const breakfast: Meal = {
      name: 'breakfast',
      foods: [],
      quantities: [],
      calories: 0
    }

    this.mealService.addMeal(breakfast);


    const lunch: Meal = {
      name: 'lunch',
      foods: [],
      quantities: [],
      calories: 0
    }

    this.mealService.addMeal(lunch);

    const dinner: Meal = {
      name: 'dinner',
      foods: [],
      quantities: [],
      calories: 0
    }

    this.mealService.addMeal(dinner);

    const snacks: Meal = {
      name: 'snacks',
      foods: [],
      quantities: [],
      calories: 0
    }

    this.mealService.addMeal(snacks);

    const day: Day = {
      date: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      idBreakfast: breakfast.id,
      idLunch: lunch.id,
      idDinner: dinner.id,
      idSnack: snacks.id,
      userId: this.userId,
      nrCal: 0
    }

    return this.dayService.addDay(day)

  }

}
