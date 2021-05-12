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
  
  batterylevel: number;
  batteryIsPlugged: any;
  activeAlarm = false;
  levelAlarm: number;
  pathSound: string;
  options: any;
  disableButton: boolean;

  constructor(public modalController: ModalController, 
    public batteryStatus: BatteryStatus, 
    ) {

    this.batteryStatus.onChange().subscribe((status) =>{
      this.batterylevel = status.level;
      this.batteryIsPlugged = status.isPlugged;

      this.getData();
      this.changeButton();
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
      if(this.options.alarmMethod.enableMethod == 'Plug-in'){
        this.activeAlarm = true;
      }
    }else{
      this.pathSound = 'battery_full_capacity.mp3'; //sound default
      this.levelAlarm = 100;
    }
  }

  statusNotification(){
    if(this.options.alarmMethod.enableMethod == 'Manual' && this.activeAlarm == true){
      if(this.batterylevel >= this.levelAlarm && this.batteryIsPlugged == true){
        this.scheduleNotification();
      }

    }else if(this.options.alarmMethod.enableMethod == 'Plug-in' && this.batteryIsPlugged == true){
      if(this.batterylevel >= this.levelAlarm){
        this.scheduleNotification();
      }
    } 
    if(this.options.alarmMethod.disableMethod == 'Plug-in' && this.batteryIsPlugged == false){
      this.cancelNotification();
    }
  }

  ionViewDidEnter(){
    const batterysubscription = this.batteryStatus.onChange().subscribe(status => {  
      this.batterylevel = status.level;

      this.changeButton();
      this.statusNotification();
    });
    this.getData();
  }

  changeButton(){
    if(this.options.alarmMethod.enableMethod == 'Plug-in'){
      this.activeAlarm = true;
      this.disableButton = true;
    }else if(this.options.alarmMethod.enableMethod == 'Manual'){
      this.disableButton = false;
    }

    if(this.options.alarmMethod.disableMethod == 'Manual' && this.batterylevel >= this.levelAlarm && this.batteryIsPlugged == true){
      this.disableButton = false;
      this.activeAlarm = true;
    }else if(this.options.alarmMethod.disableMethod == 'Plug-in' && this.batterylevel >= this.levelAlarm){
      this.disableButton = true;
      this.activeAlarm = this.batteryIsPlugged? true : false;
    }
    
  }

  changeActivationAlarm(){
    this.activeAlarm = !this.activeAlarm;
    if(this.batterylevel >= this.levelAlarm && this.options.alarmMethod.disableMethod == 'Manual' && this.activeAlarm == false){
      this.cancelNotification();
    }
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

  async cancelNotification(){
    const peding = await LocalNotifications.getPending();
    LocalNotifications.cancel(peding);
  }
}
