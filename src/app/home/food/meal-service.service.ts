import { Injectable } from '@angular/core';
import { Food } from './food-service.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FoodsFilterPipe } from './fruits/foods-filter.pipe';


export class Meal {

  id?: string;
  name?: string;
  foods?: Food[];
  quantities?: number[];
  calories?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private meals: Observable<Meal[]>;
  private mealCollection: AngularFirestoreCollection<Meal>;

  constructor(private afs: AngularFirestore) {

    this.mealCollection = this.afs.collection<Meal>('meals');
    this.meals = this.mealCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMeasl(): Observable<Meal[]> {
    return this.meals;
  }


  getMeal(id: string): Observable<Meal> {
    return this.mealCollection.doc<Meal>(id).valueChanges().pipe(
      take(1),
      map(meal => {
        meal.id = id;
        return meal;
      })
    );
  }

  getNrOfCalMeal(idMeal: string): Observable<Number> {
    return this.getMeal(idMeal).pipe(map(meal => {
      return meal.calories
    })
    )
  }

  addMeal(meal: Meal) {
    let id = this.afs.createId();
    meal.id = id;
    this.mealCollection.doc(`/${id}`).set(meal);
    //return meal;
    // return this.mealCollection.add(meal);

  }

  updateMeal(meal: Meal): Promise<void> {
    return this.mealCollection.doc(meal.id).update({
      foods: meal.foods,
      quantities: meal.quantities,
      calories: meal.calories
    });
  }

  deleteFoodFromMeal(meal: Meal, food: Food) {
    const remainingFoods = meal.foods.filter(x => x.id !== food.id);

    if(remainingFoods === meal.foods) {
      throw new Error('Is already deleted');
    }

    const indexOfDeletedFood = meal.foods.findIndex(x => x.id === food.id);
    const remainingQuantitiesOfFoods = meal.quantities;

    const quantityOfDeletedFod = remainingQuantitiesOfFoods.splice(indexOfDeletedFood, 1);
    // console.log(remainingFoods);
    // console.log(quantityOfDeletedFod);
    // console.log(quantityOfDeletedFod);


    const remainingCalories = meal.calories - ((Number(quantityOfDeletedFod) * food.calories) / 100);

    this.mealCollection.doc(meal.id).update({
      foods: remainingFoods,
      quantities: remainingQuantitiesOfFoods,
      calories: remainingCalories
    });

    return this.getMeal(meal.id);

  }

}
