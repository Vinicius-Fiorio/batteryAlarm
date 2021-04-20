import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
})
export class DateTimePage {

  @Input() start: string;
  @Input() end: string;


  constructor(public modalController: ModalController) { }

  public closeModal(){
    this.modalController.dismiss({
    	'start': this.start,
      'end': this.end
    })
  }

}
