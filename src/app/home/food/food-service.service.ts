import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, tap, delay, switchMap, filter } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';


export class Food {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
  type: string;
  approved?: boolean; 
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foods: Observable<Food[]>;
  private foodCollection: AngularFirestoreCollection<Food>;
  constructor(private afs: AngularFirestore) {

    this.foodCollection = this.afs.collection<Food>('foods');
    this.foods = this.foodCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

   }

  getFoods(): Observable<Food[]> {
    return this.foods;
  }


  getTypeFoods(typeFood: string): Observable<Food[]> {

    return this.foods.pipe(
      map( arr => arr.filter ( r => r.type === typeFood)
      )
    );
  }

  getUnapprovedFoods(): Observable<Food[]> {
    return this.foods.pipe(
      map( arr => arr.filter ( r => ( r.approved !== undefined && r.approved === false ))
      )
    );
  }

  getFood(id: string): Observable<Food> {
    return this.foodCollection.doc<Food>(id).valueChanges().pipe(
      take(1),
      map(food => {
        food.id = id;
        return food;
      })
    );
  }

  getFoodAfterName(foodName: string): Observable<Food[]> {
    return this.foods.pipe(
      map( arr => arr.filter ( r => r.name === foodName)
      )
    );
  }

  approveFood(food: Food): void {
    food.approved = true;
    this.foodCollection.doc<Food>(food.id).set(food);
  }

  addFood(food: Food): Promise<DocumentReference> {
    return this.foodCollection.add(food);
  }

  deleteFood(id: string): Promise<void> {
    return this.foodCollection.doc(id).delete();
  }

}
