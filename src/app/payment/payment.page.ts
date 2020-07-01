import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ModalCreditCardFormComponent } from '../shared/modal-credit-card-form/modal-credit-card-form.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  paymentAmount: string = '3.33';
  currency: string = 'USD';
  currencyIcon: string = 'S';
  stripe_key = 'pk_test_McpG2KYrUOIAxjxCAWgRSt3X00pxsiXUyg';
  cardDetails: any = {}

  constructor(private stripe: Stripe,private http: HttpClient,public modalController: ModalController) { }

  ngOnInit() {
  }

  payWithStripe(paymentAmount: number) {
    this.presentModal(paymentAmount);
  }

  async presentModal(paymentAmount: number) {
    const modal = await this.modalController.create({
      component: ModalCreditCardFormComponent,
      componentProps: {
        amount: paymentAmount
      }
    });
    return await modal.present();
  }


}
