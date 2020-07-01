import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FoodService, Food } from '../food-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ModalAddToMealPage } from '../modal-add-to-meal/modal-add-to-meal.page';
import { ModalAddFoodPage } from '../modal-add-food/modal-add-food.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { storage, initializeApp } from 'firebase';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.page.html',
  styleUrls: ['./fruits.page.scss'],
})
export class FruitsPage implements OnInit {

  foods: Observable<Food[]>;
  searchTerm: '';
  foodType;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private foodService: FoodService,
    private modalController: ModalController,
    private toastController: ToastController,
    private camera: Camera,
    private navCtrl: NavController) {
    //initializeApp(environment.firebaseConfig);
  }


  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('type')) {
        // this.navCrtl.navigateBack('/places/offers');
        return;
      }
      const typeFood = this.route.snapshot.paramMap.get('type');
      this.foods = this.foodService.getTypeFoods(typeFood);
      this.foodType = typeFood;
    });
  }


  getFoodType() {

    switch(this.foodType) {
      case 'fruit': {
        return "Fruits";
      }
      case 'veggie': {
        return "Veggies";
      }
      case 'meat': {
        return 'Meats';
      }
      default: {
        return 'Gaskets and Anothers';
      }
    }

  }

  onBack() {
    this.router.navigate(['home/food']);
  }

  async openModalAddNewFood() {

    const modal = await this.modalController.create({
      component: ModalAddFoodPage,
      componentProps: { foodType: this.foodType }
    });

    modal.present();
  }



  async openModalForFood(food: Food) {
    const modal = await this.modalController.create({
      component: ModalAddToMealPage,
      componentProps: { selectedFood: food, justInfo: false }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== null && dataReturned.data !== undefined ) {
        console.log(dataReturned);
        this.presentToastWithOptions(dataReturned.data);
      }
    });

    modal.present();
  }

  async presentToastWithOptions(data) {
    const toast = await this.toastController.create({
      header: 'Total calories',
      message: data.foodCalories.toFixed(1),
      position: 'bottom',
      cssClass: 'customToast',
      buttons: [
        {
          side: 'start',
          icon: 'fast-food',
          text: 'You add ' + data.foodQuantity + ' grams  of ' + data.foodName
        }, {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }

 


}
