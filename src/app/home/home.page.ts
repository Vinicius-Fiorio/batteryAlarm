import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { OptionsPage } from '../options/options.page';

import { BatteryStatus } from '@ionic-native/battery-status/ngx';

import { Plugins} from '@capacitor/core';

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

	    if(this.batterylevel >= this.levelAlarm && this.batteryIsPlugged == true){
        this.scheduleNotification();
	    }
    });
  }

  async ngOnInit(){
    await LocalNotifications.requestPermission();
  }

  getData(){
    if (localStorage.getItem('options') !== null) {
      this.options = JSON.parse(localStorage.getItem('options'));
      this.levelAlarm = this.options.batteryLevelAlarm;
      this.pathSound = this.options.ringtoneSong.path.replace('../../assets/','');
    }else{
      this.pathSound = 'battery_full_capacity.mp3'; //sound default
    }
  }

  ionViewDidEnter(){
    const batterysubscription = this.batteryStatus.onChange().subscribe(status => {  
      this.batterylevel = status.level;
    });

    this.getData();
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

    let { data } = await modal.onWillDismiss();
    console.log(data);
    this.getData();
  }

  async scheduleNotification(){

    /*/delete channel notification
    await LocalNotifications.deleteChannel({
      id: 'channel',
      name:'battery',
      importance: 5
    });*/

    this.getData();

    // Create channel notification
    await LocalNotifications.createChannel({
      id: 'battery_full_capacity.mp3',
      name:'Battery Alarm: Song Full Capacity',
      description:'channel battery alarm app',
      importance: 5,
      sound: 'battery_full_capacity.mp3',
      visibility: 1
    });

    await LocalNotifications.createChannel({
      id: 'pega_o_pato.mp3',
      name:'Battery Alarm: Song Pick the Pato',
      description:'channel battery alarm app',
      importance: 5,
      sound: 'pega_o_pato.mp3',
      visibility: 1,
      vibration: true
    });

    await LocalNotifications.createChannel({
      id: 'iphone_remix.mp3',
      name:'Battery Alarm: Song iPhone remix',
      description:'channel battery alarm app',
      importance: 5,
      sound: 'iphone_remix.mp3',
      visibility: 1,
      vibration: true
    });
  
    // send the notification
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Battery is Full",
          body: "Please remove the charger",
          id: 1,
          channelId: this.pathSound,
          sound: this.pathSound
        }
      ]
    });
  }
}
