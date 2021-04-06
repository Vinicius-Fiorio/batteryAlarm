import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  @Input() status: string;
  @Input() battery: number;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    let battery = {
      status: this.status,
      battery: this.battery
    }
    console.log(battery)
  }

  public closeModal(){
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}
