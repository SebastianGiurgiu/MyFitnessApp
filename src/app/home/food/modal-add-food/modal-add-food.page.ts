import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FoodService, Food } from '../food-service.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { storage, initializeApp } from 'firebase';


@Component({
  selector: 'app-modal-add-food',
  templateUrl: './modal-add-food.page.html',
  styleUrls: ['./modal-add-food.page.scss'],
})
export class ModalAddFoodPage implements OnInit {

  private food: FormGroup;
  nrCal = 0;
  myPhoto = '';
  urlPhoto = '';
  isLoadingPhoto = false;

  // ceva imagine Default mai cute
  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private foodService: FoodService, private camera: Camera) {
    this.food = this.formBuilder.group({
      name: [''],
      proteins: [''],
      carbohydrates: [''],
      fats: [''],
      description: [''],
      type: ['fruit'],
      calories: [''],
      imageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      approved: false 
    });
  }

  ngOnInit() {
    this.food.valueChanges.subscribe(() => {
      const proteins = this.food.get('proteins').value !== '' ? Number(this.food.get('proteins').value) : 0;
      const carbohydrates = this.food.get('carbohydrates').value !== '' ? Number(this.food.get('carbohydrates').value) : 0;
      const fats = this.food.get('fats').value !== '' ? Number(this.food.get('fats').value) : 0;
      this.nrCal = (proteins * 4) + (carbohydrates * 4) + (fats * 9);
    });
  }

  addNewFood(){
    this.food.get('imageUrl').setValue(this.urlPhoto);
    this.foodService.addFood(this.food.value);
    this.modalController.dismiss(null, 'cancel');
  }
  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }


  takePhoto() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.isLoadingPhoto = true;
    this.camera.getPicture(options).then((imageData) => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      let date = new Date().getTime();
      let key = String(date);
      const pictures = storage().ref('pictures/' + key);
      pictures.putString(this.myPhoto, 'data_url').then((savedPicture) => {
        return savedPicture.ref.getDownloadURL();
      }).then(downloadUrl => {
        this.urlPhoto = downloadUrl;
        this.isLoadingPhoto = false;
        return downloadUrl;
      }).catch(err => {
      });
    }, (err) => {
      console.log(err);
    });
    
  }

  takeGallery() {
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.isLoadingPhoto = true;
    this.camera.getPicture(options).then((imageData) => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      let date = new Date().getTime();
      let key = String(date);
      const pictures = storage().ref('pictures/' + key);
      pictures.putString(this.myPhoto, 'data_url').then((savedPicture) => {
        return savedPicture.ref.getDownloadURL();
      }).then(downloadUrl => {
        this.urlPhoto = downloadUrl;
        this.isLoadingPhoto = false;
        return downloadUrl;
      }).catch(err => {
        //this.errors = err;
      });
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

}
