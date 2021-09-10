import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PornDetailPage } from './porn-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PornDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PornDetailPageRoutingModule {}
