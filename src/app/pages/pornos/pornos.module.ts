import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PornosPageRoutingModule } from './pornos-routing.module';

import { PornosPage } from './pornos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PornosPageRoutingModule
  ],
  declarations: [PornosPage]
})
export class PornosPageModule {}
