import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Howl } from 'howler';

@Component({
  selector: 'app-music-options',
  templateUrl: './music-options.page.html',
  styleUrls: ['./music-options.page.scss'],
})
export class MusicOptionsPage implements OnInit {

  @Input() ringtone: any;

  songs = [['Full Baterry','Ringtone','../../assets/battery_full_capacity.mp3',false],
  ['Pick the Pato','Music','../../assets/pega_o_pato.mp3',false],
  ['Iphone Remix','Ringtone','../../assets/iphone_remix.mp3',false]]

  songSelected:any = ['','','',];
  player : Howl = null;


  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.songs.forEach(song =>{
      if(this.ringtone.path == song[2]){
        song[3] = true;
      }
    })
  }

  mostrar(songSelect:any){
    this.songs.forEach(song => {
      if(songSelect == song && song[3] == false){
        song[3] = true;

        if(this.player != null)
          this.player.stop()

        this.player = new Howl({
          src: song[2].toString()
        })
        
        this.player.play();
      }else if(songSelect == song && song[3] == true){
        this.player.pause()
      }else{
        song[3] = false;
      }
    });
  }

  public closeModal(){

    try{
      this.player.pause()
    } 
    catch(error){
      console.log(error.name , error.message)
    }

    for(let i=0; i<this.songs.length; i++){
      if(this.songs[i][3] == true){
        this.songSelected[0] = this.songs[i][0];
        this.songSelected[1] = this.songs[i][1];
        this.songSelected[2] = this.songs[i][2];
      }
    }

    this.modalController.dismiss({
    	'name': this.songSelected[0],
      'type': this.songSelected[1],
      'namePath': this.songSelected[2],
    })
  }

}
