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
  methodValue:number

  constructor(public modalController: ModalController, public alertController: AlertController) {

    //initialize array percents
    for(let x = 1; x<100;x++){
      this.percents.push(x);
    };

  }

  changeMethodAlarm(){
    switch(this.methodValue){
      case 1:
        this.options.alarmMethod.enableMethod = 'Manual'
        this.options.alarmMethod.disableMethod = 'Manual'
        break;
      case 2:
        this.options.alarmMethod.enableMethod = 'Manual'
        this.options.alarmMethod.disableMethod = 'Plug-in'
        break;
      case 3:
        this.options.alarmMethod.enableMethod = 'Plug-in'
        this.options.alarmMethod.disableMethod = 'Manual'
        break;
      case 4:
        this.options.alarmMethod.enableMethod = 'Plug-in'
        this.options.alarmMethod.disableMethod = 'Plug-in'
        break;
    }
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
