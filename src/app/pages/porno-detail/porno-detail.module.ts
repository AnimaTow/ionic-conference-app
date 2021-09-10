import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PornoDetailPageRoutingModule } from './porno-detail-routing.module';

import { PornoDetailPage } from './porno-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PornoDetailPageRoutingModule
  ],
  declarations: [PornoDetailPage]
})
export class PornoDetailPageModule {}
