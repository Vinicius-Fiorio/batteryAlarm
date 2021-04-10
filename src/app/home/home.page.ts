import { Component } from '@angular/core';

import { ModalController, NavController } from '@ionic/angular';
import { OptionsPage } from '../options/options.page';

import { BatteryStatus } from '@ionic-native/battery-status/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [BatteryStatus]
})
export class HomePage {
  
  batterylevel:any = 0;
  batteryIsPlugged:any;
  activeAlarm: boolean = false;

  constructor(public modalController: ModalController, public batteryStatus: BatteryStatus) {
    this.batteryStatus.onChange().subscribe((status) =>{
      this.batterylevel = status.level;
      this.batteryIsPlugged = status.isPlugged;
    });
  }

  changeActivationAlarm(){

    this.activeAlarm = !this.activeAlarm;
    console.log(this.activeAlarm);
  }

  formatTitle = () => `${this.batterylevel}%`;
  

  async presentModal() {
    const modal = await this.modalController.create({
      component: OptionsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'status': this.batteryIsPlugged,
        'battery': this.batterylevel
      },
      swipeToClose: true
    });
    return await modal.present();
  }
  
  public openModal(){
    this.modalController.create
  }

}
