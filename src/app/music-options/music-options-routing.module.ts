import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicOptionsPage } from './music-options.page';

const routes: Routes = [
  {
    path: '',
    component: MusicOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicOptionsPageRoutingModule {}
