import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  @Input() status: string;
  @Input() battery: number;

  constructor(public modalController: ModalController, public alertController: AlertController) { }

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

  test(){
    console.log(this.options.notDisturbing.active, this.options.darkMode.active);
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class-alert',
      header: 'Battery level alarm',
      subHeader: 'Enter battery level to sound the alarm',
      message: '0 to 100',
      mode: 'ios',
      inputs: [
        {
          id: 'batteryLevel',
          name: 'Level',
          type: 'number',
          min: 1,
          max: 100,
          placeholder: '98',      
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (data) => {
            if(data.Level > 100)
              data.Level = 100

            this.options.batteryLevelAlarm = parseInt(data.Level);
            console.log('Confirm Ok',this.options.batteryLevelAlarm);
          }
        }
      ]
    });
    

    await alert.present();
  }
}
