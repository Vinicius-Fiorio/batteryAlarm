import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-music-options',
  templateUrl: './music-options.page.html',
  styleUrls: ['./music-options.page.scss'],
})
export class MusicOptionsPage implements OnInit {

  @Input() ringtone: any;

  songs = [['Full Baterry','Ringtone','battery_full_capacity.mp3',false],
  ['Pick the Pato','Music','pega_o_pato.mp3',false],
  ['Iphone Remix','Ringtone','iphone_remix.mp3',false]]

  songSelected:any = ['','','',];


  constructor(public modalController: ModalController,private nativeAudio: NativeAudio) { }

  ngOnInit() {
    this.songs.forEach(song =>{
      if(this.ringtone.path == song[2]){
        song[3] = true;
      }
    })

    this.nativeAudio.preloadComplex('battery_full_capacity.mp3', '../../assets/batery_full_capacity.mp3',1,1,0).then((aa)=>{
      console.log("Deu bom:", aa)
    });
    this.nativeAudio.preloadComplex('pega_o_pato.mp3', '../../assets/pega_o_pato.mp3',1,1,0).then((aa)=>{
      console.log("Deu bom:", aa)
    });
    this.nativeAudio.preloadComplex('iphone_remix.mp3', 'https://www.youtube.com/watch?v=uGcqrLOSAJ8',1,1,0).then((aa)=>{
      console.log("Deu bom:", aa)
    });
  }

  mostrar(songSelect:any){
    this.songs.forEach(song => {
      if(songSelect == song && song[3] == false){
        song[3] = true;
        this.nativeAudio.play(song[2].toString())
      }else if(songSelect == song && song[3] == true){
        console.log("Som ja esta selecionado")
        this.nativeAudio.stop(song[2].toString())
      }else{
        song[3] = false;
      }
    });
  }

  public closeModal(){
    for(let i=0; i<this.songs.length; i++){
      if(this.songs[i][3] == true){
        this.songSelected[0] = this.songs[i][0];
        this.songSelected[1] = this.songs[i][1];
        this.songSelected[2] = this.songs[i][2];
      }
    }

    this.nativeAudio.unload(this.songs[0][2].toString());
    this.nativeAudio.unload(this.songs[1][2].toString());
    this.nativeAudio.unload(this.songs[2][2].toString());

    this.modalController.dismiss({
    	'name': this.songSelected[0],
      'type': this.songSelected[1],
      'namePath': this.songSelected[2],
    })
  }

}
