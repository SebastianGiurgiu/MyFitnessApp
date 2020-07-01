import { Component, OnInit } from '@angular/core';
import { MealService } from '../food/meal-service.service';
import { DayService, Day } from '../food/day.service';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-food-history',
  templateUrl: './food-history.page.html',
  styleUrls: ['./food-history.page.scss'],
})
export class FoodHistoryPage implements OnInit {

  constructor(private mealService: MealService,
    private dayService: DayService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
  ) { }

  isLoading = false;
  day: Day;
  days: Day[];
  userId: string;
  indexDay = 0;
  nrOfDays = 0;

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
        this.days = val 
        console.log(this.days);
        console.log(new Date(this.days[0].date))
        this.days.sort((a,b)  =>  { 
          return new Date(a.date).getTime() - new Date(b.date).getTime() })
        this.indexDay = this.days.length - 1
        this.nrOfDays = this.days.length
        this.day = this.days[this.indexDay]
      })
  }

  nextDay() {
    this.indexDay += 1;
    this.day = this.days[this.indexDay];
    console.log(this.day);
  }

  previousDay() { 
    this.indexDay -= 1;
    this.day = this.days[this.indexDay];
    console.log(this.day);
  }



}
