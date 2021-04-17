import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
})
export class DateTimePage {

  startTime = "14:43";
  endTime = "19:43";

  constructor(public modalController: ModalController) { }

  public closeModal(){
    this.modalController.dismiss({
    	'start': this.startTime,
      'end': this.endTime
    })
  }

}
