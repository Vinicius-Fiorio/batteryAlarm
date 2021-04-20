import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { BatteryStatus } from '@ionic-native/battery-status/ngx';


import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DateTimePage } from '../date-time/date-time.page';

import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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
  teste:any;

  constructor(public modalController: ModalController, 
    public alertController: AlertController, 
    public batteryStatus: BatteryStatus,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    public loadingController: LoadingController,
    public toastController: ToastController
    ) {

    this.batteryStatus.onChange().subscribe((status) =>{
      this.battery = status.level;
      this.status = status.isPlugged;
    });

    //initialize array percents
    for(let x = 1; x<=100;x++){
      this.percents.push(x);
    };
  }

  options = {
    batteryLevelAlarm: 100,
    ringtoneSong: {
      name: 'Default Ringtone',
      path: '../../assets/batery_full_capacity.mp3'
    },

    notDisturbing: {
      active: false,
      start: '22:00',
      end: '8:00'
    },

    alarmMethod:{
      enableMethod: 'Plug-in',
      disableMethod: 'Manual'
    },

    darkMode: false,
    language: 'English'
  }

  ngOnInit(){
    if (localStorage.getItem('options') !== null) {
      this.options = JSON.parse(localStorage.getItem('options'));
    }
  }


  //Ringtone Song
  pickFileAlarm(){

    let filter={ "mime": "audio/*" } // filter to select only audio files
    this.fileChooser.open(filter)
      .then(uri => {
        this.filePath.resolveNativePath(uri).then(nativePath =>{
          let filename = nativePath.substring(nativePath.lastIndexOf('/')+1);
          if(filename.length > 35){
            let sub = filename.substring(0,35);
            this.options.ringtoneSong.name = sub.concat(' ...');
          }else{
            this.options.ringtoneSong.name = filename;
          }
          this.options.ringtoneSong.path = nativePath;
        })
      })
      .catch(e => {
        this.teste = e;
      });
  }

  //Date Time chooser
  async presentModal() {
      const modal = await this.modalController.create({
        component: DateTimePage,
        cssClass: 'my-custom-class',
        componentProps: {
          'start': this.options.notDisturbing.start,
          'end': this.options.notDisturbing.end
        },
        swipeToClose: false
      });

      await modal.present();

      const { data } = await modal.onWillDismiss();
  
      this.options.notDisturbing.start = data.start
      this.options.notDisturbing.end = data.end
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
      message = 'Your settings have been saved';
      color = 'success';

    }catch(error){
      message = `Error: ${error.message}`;
      color = 'danger';

    }finally{
      setTimeout(() => {
        this.presentToast(message,color);
      }, 1500);
      
    }
  }

  //Loading controller
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      mode: 'ios',
      message: 'Please wait...',
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
    this.modalController.dismiss({
    	'options': this.options
    })
  }

}
