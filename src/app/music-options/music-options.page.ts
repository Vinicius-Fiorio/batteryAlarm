import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-music-options',
  templateUrl: './music-options.page.html',
  styleUrls: ['./music-options.page.scss'],
})
export class MusicOptionsPage implements OnInit {

  songs = [['Full Baterry','Ringtone'],['Pick the Pato','Music']]

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    
  }

  public closeModal(){
    this.modalController.dismiss({
    	'teste': 'aaaaaaaa'
    })
  }

}
