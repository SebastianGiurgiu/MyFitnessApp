import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  features: FormGroup;
  checked = false;


  constructor(private formBuilder: FormBuilder, public alertController: AlertController) {
    this.features = this.formBuilder.group({
      goal: ['1'],
      height: [''],
      weight: [''],
      ages: ['25'],
      sexM: false,
      sexF: false,
      lvlActivity: ['s']
    });
  }

  ngOnInit() {
  }

  async presentAlert() {
    let lvlActivity;
    switch (this.features.get('lvlActivity').value) {
      case 's': {
        lvlActivity = 1;
        break;
      }
      case 'sa': {
        lvlActivity = 1.2;
        break;
      }
      case 'a': {
        lvlActivity = 1.3;
        break;
      }
      case 'va': {
        lvlActivity = 1.4;
        break;
      }
    }
    let purspose;
    switch (this.features.get('goal').value) {
      case '0': {
        purspose = 0.80;
        break;
      }
      case '1': {
        purspose = 1;
        break;
      }
      case '2': {
        purspose = 1.25;
        break;
      }
    }

    let sexDiff;
    if (this.features.get('sexM').value) {
      sexDiff = 5;
    } else {
      sexDiff = -161;
    }


    const nrM = (((10 * this.features.get('weight').value + 6.25 * this.features.get('height').value - 5 * this.features.get('ages').value + sexDiff) * lvlActivity) * purspose).toFixed(1);

    const alert = await this.alertController.create({
      header: 'Your Goal',
      cssClass: 'alertcss',
      message: String(nrM),
      buttons: ['OK']
    });

    await alert.present();
  }

  onSave() {
    this.presentAlert();
  }

}
