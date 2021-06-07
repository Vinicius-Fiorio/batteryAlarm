import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { BatteryStatus } from '@ionic-native/battery-status/ngx';

import { DateTimePage } from '../date-time/date-time.page';
import { MusicOptionsPage } from '../music-options/music-options.page';

import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss']
})
export class OptionsPage{

  @Input() status: boolean;
  @Input() battery: number;

  percents=[];
  methodValue:number;

  langs: string[] = [];

  options = {
    batteryLevelAlarm: 100,
    ringtoneSong: {
      name: 'Battery a Full Capacity',
      path: 'battery_full_capacity.mp3'
    },

    alarmMethod:{
      enableMethod: 'Plug-in',
      disableMethod: 'Manual'
    },

    darkMode: false,
    language: 'en - English'
  }

  constructor(public modalController: ModalController, 
    public alertController: AlertController, 
    public batteryStatus: BatteryStatus,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private translate: TranslateService
    ) {

    document.body.setAttribute('color-theme', 'light');
    this.batteryStatus.onChange().subscribe((status) =>{
      this.battery = status.level;
      this.status = status.isPlugged;
    });

    //level alarm array percents option 
    for(let x = 1; x<=100;x++){
      this.percents.push(x);
    };
  }

  changeLang(lang: string) {
    console.log(lang)
    localStorage.setItem('options', JSON.stringify(this.options));
    this.translate.use(lang.substring(0,2));
  }

  ngOnInit(){
    if (localStorage.getItem('options') !== null) {
      this.options = JSON.parse(localStorage.getItem('options'));
    }

    if(this.options.darkMode == true){
      document.body.setAttribute('color-theme', 'dark');
    }else{
      document.body.setAttribute('color-theme', 'light');
    }

    this.translate.setDefaultLang(this.options.language.substring(0,2));
    this.translate.use(this.options.language.substring(0,2));
    this.translate.addLangs(['en', 'pt']);
    this.langs = this.translate.getLangs();
  }

  //How to Use page
  async presentModalDate() {
      const modal = await this.modalController.create({
        component: DateTimePage,
        cssClass: 'my-custom-class',
        swipeToClose: false
      });

      await modal.present();
  }

  //Ringtone Song page
  async presentModalSong() {
    const modalzin = await this.modalController.create({
      component: MusicOptionsPage,
      cssClass: 'my-custom-classs',
      componentProps: {
        'ringtone': this.options.ringtoneSong
      },
      swipeToClose: false
    });

    await modalzin.present();

    const { data } = await modalzin.onWillDismiss();

    this.options.ringtoneSong.name = data.name;
    this.options.ringtoneSong.path = data.namePath;

    console.log(data);
  
  }

  // Alarm Method
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

  //insert Data Local Storage
  public insertData(options:any){
    let message:string;
    let color:string;

    this.presentLoading();

    try{
      localStorage.setItem('options', JSON.stringify(options));
      this.translate.get('messageToast').subscribe((msg) =>{
        message = msg;
      })
      color = 'success';

    }catch(error){
      message = `Error: ${error.message}`;
      color = 'danger';

    }finally{
      setTimeout(() => {
        this.presentToast(message,color);
      }, 1200);
      
    }
  }

  toogleTheme(event){
    if(event.detail.checked){
      this.options.darkMode = true;
      document.body.setAttribute('color-theme', 'dark');
    }else{
      this.options.darkMode = false;
      document.body.setAttribute('color-theme', 'light');
    }
  }

  //Loading controller
  async presentLoading() {

    let loadingMesasge:string;
    this.translate.get('loading').subscribe((msg) =>{
      loadingMesasge =  msg;
    })

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      mode: 'ios',
      message: loadingMesasge,
      duration: 1000
    });
    await loading.present();

  }

  //Toast controller
  async presentToast(message:string, color:string) {
    const toast = await this.toastController.create({
      cssClass: 'toast-container',
      message: message,
      position: 'top',
      color: color,
      duration: 2000
    });
    toast.present();
  }

  public closeModal(){
    if (localStorage.getItem('options') !== null) {
      let optionsData = JSON.parse(localStorage.getItem('options'));

      if(JSON.stringify(this.options) != JSON.stringify(optionsData)){
        this.insertData(this.options);
      }
    }

    this.modalController.dismiss({
    	'options': this.options,
      'pathSound': this.options.ringtoneSong.path
    })
  }
}
