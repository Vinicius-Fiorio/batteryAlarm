import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicOptionsPageRoutingModule } from './music-options-routing.module';

import { MusicOptionsPage } from './music-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicOptionsPageRoutingModule
  ],
  declarations: [MusicOptionsPage]
})
export class MusicOptionsPageModule {}
