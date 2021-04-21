import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { OptionsPage } from '../options/options.page';

import { BatteryStatus } from '@ionic-native/battery-status/ngx';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [BatteryStatus]
})

export class HomePage {
  
  batterylevel:number;
  batteryIsPlugged:any;
  activeAlarm = false;
  levelAlarm = 100;
  pathSound:string;
  options:any;

  constructor(public modalController: ModalController, 
    public batteryStatus: BatteryStatus, 
    private localNotifications: LocalNotifications,
    ) {

    this.batteryStatus.onChange().subscribe((status) =>{
      this.batterylevel = status.level;
      this.batteryIsPlugged = status.isPlugged;

	    if( this.batterylevel >= this.levelAlarm){
        this.scheduleNotification();
	    }
    });

    this.localNotifications.hasPermission
  }

  ionViewDidEnter(){
    const batterysubscription = this.batteryStatus.onChange().subscribe(status => {  
      this.batterylevel = status.level;
    });

    if (localStorage.getItem('options') !== null) {
      this.options = JSON.parse(localStorage.getItem('options'));
      this.levelAlarm = this.options.batteryLevelAlarm;
      this.pathSound = this.options.ringtoneSong.path;
    }
  }

  changeActivationAlarm(){
    this.activeAlarm = !this.activeAlarm;
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

    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.levelAlarm = data.options.batteryLevelAlarm;
  }

  scheduleNotification(){

    // Create the notification
    this.localNotifications.schedule({
      id: 1,
      title: 'Charged battery',
      text: 'Please remove the charger from the device',
      vibrate: true,
      lockscreen: true,
      foreground: true,
      sound: 'file://raw/batery_full_capacity.mp3'
    });
  }

  clearNotificaation(){
    this.localNotifications.clearAll();
  }
  
}
