import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DateTimePageRoutingModule } from './date-time-routing.module';

import { DateTimePage } from './date-time.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DateTimePageRoutingModule,
    TranslateModule
  ],
  declarations: [DateTimePage]
})
export class DateTimePageModule {}
