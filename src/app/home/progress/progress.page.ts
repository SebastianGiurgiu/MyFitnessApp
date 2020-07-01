import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Day, DayService } from '../food/day.service';
import { MealService } from '../food/meal-service.service';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {

  @ViewChild('barChart', { static: false }) barChart;

  @Input()
  dummy: any;

  bars: any;
  colorArray: any;

  isLoading = false;
  day: Day;
  days: Day[];
  userId: string;
  indexDay = 0;
  nrOfDays = 0;
  labelsDays: string[] = [];
  totalCalories = 0;
  values = [];

  constructor(private mealService: MealService,
    private dayService: DayService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
  ) { }



  ngOnInit() {
    this.dummy = 5;
    console.log("ngoninit")
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
        this.days = val;
        this.days.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        })

        if (this.days) {
          this.days.forEach(day => {
            if(day.nrCal !== undefined && day.nrCal !== 0){
              this.values.push(day.nrCal);
              this.labelsDays.push(day.date);
            } else {
              // this.values.push(0);
            }
          })
        };
        console.log(this.labelsDays);
        console.log(this.values);
        this.createBarChart();
      })
  }

  ionViewWillEnter() {
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labelsDays.slice(Math.max(this.labelsDays.length - 10,0)),
        datasets: [{
          label: 'Calories per day',
          data: this.values.slice(Math.max(this.labelsDays.length - 10,0)),
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
