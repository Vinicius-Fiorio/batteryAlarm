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
  
  batterylevel:any = 0;
  constructor(public modalController: ModalController, public batteryStatus: BatteryStatus) {
    this.batteryStatus.onChange().subscribe((status) =>{
      this.batterylevel = status.level;
    });
  }

  formatTitle = () => `${this.batterylevel}%`;
  verifica = this.batterylevel<=90

  async presentModal() {
    const modal = await this.modalController.create({
      component: OptionsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'status': 'active',
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
