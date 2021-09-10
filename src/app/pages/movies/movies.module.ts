import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesPageRoutingModule } from './movies-routing.module';

import { MoviesPage } from './movies.page';
import { GenreFilterPage } from '../genre-filter/genre-filter';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesPageRoutingModule
  ],
  declarations: [MoviesPage, GenreFilterPage]
})
export class MoviesPageModule {}