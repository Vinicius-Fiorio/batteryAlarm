import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { BatteryStatus } from '@ionic-native/battery-status/ngx';



import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss']
})
export class OptionsPage implements OnInit {

  @Input() status: boolean;
  @Input() battery: number;

  percents=[];
  methodValue:number;
  teste:any;

  constructor(public modalController: ModalController, 
    public alertController: AlertController, 
    public batteryStatus: BatteryStatus,
    private fileChooser: FileChooser,
    private filePath: FilePath
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
      path: 'aa/b/c.mp3'
    },

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



  ngOnInit() {

  }

  public closeModal(){
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}
