import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaTabsPageRoutingModule } from './media-tabs-routing.module';

import { MediaTabsPage } from './media-tabs.page';
import {MoviesPageModule} from '../movies/movies.module';
import {SerienPageModule} from '../serien/serien.module';
import {AnimesPageModule} from '../animes/animes.module';
import {PornosPageModule} from '../pornos/pornos.module';
import {MovieDetailPageModule} from '../movie-detail/movie-detail.module';
import {SerieDetailPageModule} from '../serie-detail/serie-detail.module';
import {AnimeDetailPageModule} from '../anime-detail/anime-detail.module';
import {PornoDetailPageModule} from '../porno-detail/porno-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaTabsPageRoutingModule,
    MoviesPageModule,
    MovieDetailPageModule,
    SerienPageModule,
    SerieDetailPageModule,
    AnimesPageModule,
    AnimeDetailPageModule,
    PornosPageModule,
    PornoDetailPageModule
  ],
  declarations: [MediaTabsPage]
})
export class MediaTabsPageModule {}
