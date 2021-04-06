import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { OptionsPage } from '../options/options.page';

import { BatteryStatus } from '@ionic-native/battery-status/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [BatteryStatus]
})
export class HomePage {
  battery = {
    level: 95,
    isPlugged: false
  };
  
  constructor(public modalController: ModalController, private batteryStatus: BatteryStatus) {
    
    this.getStatus()
  }
  

  atual = 95;


  getStatus(){
    this.batteryStatus.onChange().subscribe(status => {
      this.battery = status;
    });
  }

  formatTitle = () => `${this.battery.level}%`;
  verifica = this.atual<=90

  async presentModal() {
    const modal = await this.modalController.create({
      component: OptionsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'status': 'active',
        'battery': this.atual
      },
      swipeToClose: true
    });
    return await modal.present();
  }
  
  public openModal(){
    this.modalController.create
  }

}
