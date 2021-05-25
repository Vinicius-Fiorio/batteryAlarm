import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsPageRoutingModule } from './options-routing.module';

import { OptionsPage } from './options.page';
import { HideHeaderDirective } from '../directives/hide-header.directive';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsPageRoutingModule,
    HttpClientModule,
    TranslateModule
  ],
  declarations: [OptionsPage, HideHeaderDirective]
})
export class OptionsPageModule {}
