import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PornDetailPageRoutingModule } from './porn-detail-routing.module';

import { PornDetailPage } from './porn-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PornDetailPageRoutingModule
  ],
  declarations: [PornDetailPage]
})
export class PornDetailPageModule {}
