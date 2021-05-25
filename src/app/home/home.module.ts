import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      space: -17,
      outerStrokeGradient: true,
      outerStrokeWidth: 17,
      innerStrokeWidth: 17,
      innerStrokeColor: "#E9E9FF",
      animation: true,
      animationDuration: 500,
      showSubtitle: false,
      titleColor: "#070417",
      titleFontSize: "50px",
      showUnits: false,
      responsive: true
    }),
    HttpClientModule,
    TranslateModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
