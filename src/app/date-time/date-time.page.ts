import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
})
export class DateTimePage {


  constructor(public modalController: ModalController, private translate: TranslateService) { 
    if (localStorage.getItem('options') !== null) {
      let options = JSON.parse(localStorage.getItem('options'));

      this.translate.setDefaultLang(options.language.substring(0,2));
      this.translate.use(options.language.substring(0,2));
    }
  }

  public closeModal(){
    this.modalController.dismiss()
  }

}
