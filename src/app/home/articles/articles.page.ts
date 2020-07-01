import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform, ModalController, IonItemSliding, ToastController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ModalAfterSpeechComponent } from 'src/app/shared/modal-after-speech/modal-after-speech.component';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  matches: String[];
  isRecording = false;
  foodsAndQuatities: {quantity: number , foodName: string}[] = []

  constructor(public navCtrl: NavController,public modalController: ModalController,
    private plt: Platform, private speechRecognition: SpeechRecognition, private cd: ChangeDetectorRef, private toastController: ToastController) { }

  ngOnInit() {
  }



  startListening() {
    let options = {
      language: 'en-Us'
    }
    this.cd.detectChanges();
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    })
    this.isRecording = true;
  }


  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    })
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      })
  }


  isIos() {
    return this.plt.is('ios');
  }


  async presentModal() {
    console.log(this.foodsAndQuatities);
    const modal = await this.modalController.create({
      component: ModalAfterSpeechComponent,
      componentProps: {
        foodsAndQuatities: this.foodsAndQuatities
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== null && dataReturned.data !== undefined ) {
        this.presentToastWithOptions();
      }
    });
    modal.present();
  }
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Successfully',
      message: 'Your foods were added',
      position: 'bottom',
      cssClass: 'customToast',
      buttons: [
        {
          side: 'start',
          icon: 'fast-food'
        }, {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }



  convertTextToFoods(textFromSpeech: string, slidingEl?: IonItemSliding){
    const bindingWords = ['grams', 'gram', 'g', 'of']
    const wordsFromSpech = textFromSpeech.split(' ');
    const nrOfWords = wordsFromSpech.length;
    let indexWord = 0;
    this.foodsAndQuatities = [];
    while (indexWord < nrOfWords) {
      while (isNaN(Number(wordsFromSpech[indexWord]))) {
        indexWord += 1;
      }
      const quantity = Number(wordsFromSpech[indexWord]);
      console.log(quantity);
      indexWord += 1;
      while (bindingWords.indexOf(wordsFromSpech[indexWord]) !== -1) {
        indexWord += 1;
      }
      const foodName = wordsFromSpech[indexWord];
      console.log(foodName);
      indexWord += 1;

      this.foodsAndQuatities.push({quantity,foodName})
    }

    this.presentModal();
  }




}
