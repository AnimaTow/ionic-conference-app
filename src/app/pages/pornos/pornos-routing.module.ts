import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PornosPage } from './pornos.page';

const routes: Routes = [
  {
    path: '',
    component: PornosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PornosPageRoutingModule {}
