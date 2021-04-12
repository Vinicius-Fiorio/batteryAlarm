import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss']
})
export class OptionsPage implements OnInit {

  @Input() status: string;
  @Input() battery: number;

  batterylevel:any;
  percents=[];

  constructor(public modalController: ModalController, public alertController: AlertController) {

    //initialize array percents
    for(let x = 1; x<100;x++){
      this.percents.push(x);
    };
  }

  options = {
    batteryLevelAlarm: 100,
    ringtoneSong: 'music',

    notDisturbing: {
      active: true,
      start: '22:00',
      end: '8:00'
    },

    alarmMethod:{
      enableMethod: 'Plug-in',
      disableMethod: 'Manual'
    },

    darkMode:{
      active: false,
      method:  'Manual'
    },
    language: 'English'
  }


  ngOnInit() {
    let battery = {
      status: this.status,
      batteryLevel: this.battery
    }
    console.log(battery)
  }

  public closeModal(){
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}
