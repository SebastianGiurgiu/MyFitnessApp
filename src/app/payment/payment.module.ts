import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { ModalCreditCardFormComponent } from '../shared/modal-credit-card-form/modal-credit-card-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaymentPageRoutingModule
  ],
  declarations: [PaymentPage,ModalCreditCardFormComponent],
  entryComponents: [ModalCreditCardFormComponent]
})
export class PaymentPageModule {}
