import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlesPageRoutingModule } from './articles-routing.module';

import { ArticlesPage } from './articles.page';
import { ModalAfterSpeechComponent } from 'src/app/shared/modal-after-speech/modal-after-speech.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlesPageRoutingModule
  ],
  declarations: [ArticlesPage, ModalAfterSpeechComponent],
  entryComponents: [ModalAfterSpeechComponent]
})
export class ArticlesPageModule {}
