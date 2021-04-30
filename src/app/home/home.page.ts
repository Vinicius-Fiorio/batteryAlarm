import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { OptionsPage } from '../options/options.page';

import { BatteryStatus } from '@ionic-native/battery-status/ngx';

import { Plugins, LocalNotification } from '@capacitor/core';

const { LocalNotifications } = Plugins;

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
    ) {

    this.batteryStatus.onChange().subscribe((status) =>{
      this.batterylevel = status.level;
      this.batteryIsPlugged = status.isPlugged;

	    if( this.batterylevel >= this.levelAlarm){
        this.scheduleNotification();
	    }
    });
  }

  async ngOnInit(){
    await LocalNotifications.requestPermission();
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
    this.pathSound = this.options.ringtoneSong.path;
    this.levelAlarm = data.options.batteryLevelAlarm;
  }

  async scheduleNotification(){

    /*/delete channel notification
    await LocalNotifications.deleteChannel({
      id: 'channel',
      name:'battery',
      importance: 5
    });*/

    // Create channel notification
    await LocalNotifications.createChannel({
      id: 'aaaa',
      name:'aaa',
      description:'channel battery alarm app',
      importance: 5,
      sound: "batery_full_capacity.mp3",
      visibility: 1
    });
  
    // send the notification
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Battery is Full",
          body: "Please remove the charger",
          id: 1,
          channelId: 'aaaa',
        }
      ]
    });
  }
}
