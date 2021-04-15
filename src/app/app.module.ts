import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';

import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,NgCircleProgressModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, BatteryStatus, File, FileChooser, FilePath],
  bootstrap: [AppComponent],
})
export class AppModule {}
