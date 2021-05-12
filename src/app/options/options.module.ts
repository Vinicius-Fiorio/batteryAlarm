import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsPageRoutingModule } from './options-routing.module';

import { OptionsPage } from './options.page';
import { HideHeaderDirective } from '../directives/hide-header.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsPageRoutingModule
  ],
  declarations: [OptionsPage, HideHeaderDirective]
})
export class OptionsPageModule {}
