import { Injectable } from '@angular/core';
import { Meal, MealService } from './meal-service.service';
import { Observable, from, of, forkJoin } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, take, switchMap } from 'rxjs/operators';
import { Food } from './food-service.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Plugins } from '@capacitor/core';
import { StorageService } from 'src/app/shared/storage.service';

export class Day {
  id?: string;
  date?: string;
  idBreakfast?: string;
  idLunch?: string;
  idDinner?: string;
  idSnack?: string;
  userId?: string;
  nrCal?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private days: Observable<Day[]>;
  private dayCollection: AngularFirestoreCollection<Day>;
  private userId: string;

  constructor(private afs: AngularFirestore,
              private authService: AuthService,
              private storageService: StorageService,
              private mealService: MealService) {

    this.dayCollection = this.afs.collection<Day>('days');
    this.days = this.dayCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.authService.userId.subscribe(userId =>{
      this.userId = userId
    })
  }


  getDays(): Observable<Day[]> {
    return this.days;
  }

  setNrCal(day: Day,nrCalFromMeal: number) {
    this.dayCollection.doc(day.id).update({
      nrCal: day.nrCal + nrCalFromMeal
    })
  }

  getDay(id: string): Observable<Day> {
    return this.dayCollection.doc<Day>(id).valueChanges().pipe(
      take(1),
      map(day => {
        day.id = id;
        return day;
      })
    );
  }

  getDaysByUser(userId: string): Observable<Day[]> {
    return this.days.pipe(
      map( arr => arr.filter ( r => r.userId === userId)
      )
    );
  }

  addDay(day: Day): Observable<Day> {
    let id = this.afs.createId();
    day.id = id;
    this.dayCollection.doc(`/${id}`).set(day);
    return this.getDay(id)
  }

  getNrOfCaloriesPerDay(day: Day): Observable<Number> {
    
    return forkJoin(
      this.mealService.getNrOfCalMeal(day.idBreakfast),
      this.mealService.getNrOfCalMeal(day.idLunch),
      this.mealService.getNrOfCalMeal(day.idDinner),
      this.mealService.getNrOfCalMeal(day.idSnack)
      ).pipe(
        map( ([res1,res2,res3,res4]) => {
          var total = 0;
          total += Number(res1);
          total += Number(res2);
          total += Number(res3);
          total += Number(res4);
          return total;
        }
        )
      )
  }

  storeDayData(
  currentDayId: string
  ) {
   // this.storageService.setString('currentDayId',currentDayId);
    
    const data = JSON.stringify({ currentDayId });
    Plugins.Storage.set({ key: 'currentDayId', value: data });
  }
  
  getCurrentDayId(): Observable<string> {
    return from(Plugins.Storage.get({ key: 'currentDayId' }))
    .pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as
          {
            currentDayId: string;
          };
       return parsedData.currentDayId;
        })
    )
  }


  setMeal(day: Day, meal: Meal, chooseMeal: string) {

    switch (chooseMeal) {
      case 'lunch': {
        this.dayCollection.doc(day.id).update({
          lunch: meal
        })
        break;
      }
      case 'dinner': {
        this.dayCollection.doc(day.id).update({
          dinner: meal
        })
        break;
      }
      case 'snacks': {
        this.dayCollection.doc(day.id).update({
          snack: meal
        })
        break;
      }
      default: {
        this.dayCollection.doc(day.id).update({
          breakfast: meal
        })
        break;
      }
    }
  }

}
