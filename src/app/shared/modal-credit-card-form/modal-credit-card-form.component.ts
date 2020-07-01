import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-modal-credit-card-form',
  templateUrl: './modal-credit-card-form.component.html',
  styleUrls: ['./modal-credit-card-form.component.scss'],
})
export class ModalCreditCardFormComponent implements OnInit {

  amount: number;
  stripe_key = 'pk_test_McpG2KYrUOIAxjxCAWgRSt3X00pxsiXUyg';
  cardDetails: any = {}
  card: FormGroup;
  constructor(private formBuilder: FormBuilder, private stripe: Stripe, private http: HttpClient,
    private loadigController: LoadingController, private modalController: ModalController) {
    this.card = this.formBuilder.group({
      name: ['Sebastian Giurgiu', Validators.required],
      number: ['4242424242424242', Validators.required],
      expMonth: ['12', Validators.required],
      expYear: ['25', Validators.required],
      cvc: ['220', Validators.required],
      email: ['sebastiangiurgiu1998@gmail.com', [Validators.required,Validators.email]]
    });
  }

  ngOnInit() {
   }

  async payWithStripe() {
    let loading = await this.loadigController.create({
      message: "Banking transcation..."
    })
    loading.present();

    console.log(this.card.value);
    this.stripe.setPublishableKey(this.stripe_key);

    this.cardDetails = {
      number: this.card.get('number').value,
      expMonth: Number(this.card.get('expMonth').value),
      expYear: Number(this.card.get('expYear').value),
      cvc: this.card.get('cvc').value
    }

    this.stripe.createCardToken(this.cardDetails)
      .then(token => {
        console.log(token);
        this.makePayment(token.id,loading);
      })
      .catch(error => console.error(error));
  }

  makePayment(token,loading) {
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    const data = {
      token: token,
      amount: this.amount * 100
    };
    console.log("Ce trimit care server");
    console.log(data);
    this.http
      .post('https://us-central1-licenta-e4888.cloudfunctions.net/payWithStripe', data, httpOptions)
      .subscribe(data => {
        console.log('S-a efectuat transferul de bani');
        this.sendMail(this.card.get('email').value,loading)
      });

  }

  invalidAlert() {
    alert("Nu ati completat toate campurile");
  }


  dismissModal() {
    this.modalController.dismiss();
  }

  sendMail(dest: string,loading: any) {
    loading.message = "Sending email..."
    console.log('Incepe trimtierea de email catre:' + dest);
    let subject = '';
    if(this.amount === 10) {
      subject = 'Your Beginner Pack is here';
    }

    if(this.amount === 21) {
      subject = 'Your Intermediate Pack is here';
    }

    if(this.amount === 37) {
      subject = 'Advanced Pack is here';
    }

    const data = {
      dest: dest,
      subject: subject
    };

    this.http
      .post('https://us-central1-licenta-e4888.cloudfunctions.net/sendMail', data ,
      {responseType: 'text'})
      .subscribe(data => {
        console.log('S-a efectuat trimiterea de email');
        this.dismissModal();
        loading.dismiss();
      });

  }


}
