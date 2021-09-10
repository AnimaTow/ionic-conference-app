import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaTabsPage } from './media-tabs.page';
import {MoviesPage} from '../movies/movies.page';
import {AnimesPage} from '../animes/animes.page';
import {PornosPage} from '../pornos/pornos.page';

const routes: Routes = [
  {
    path: '',
    component: MediaTabsPage,
    children: [
      {
        path: 'movies',
        children: [
          {
            path: '',
            component: MoviesPage,
          },
          {
            path: 'movie-details/:movieId',
            loadChildren: () => import('../movie-detail/movie-detail.module').then(m => m.MovieDetailPageModule)
          }
        ]
      },
      {
        path: 'serien',
        children: [
          {
            path: '',
            loadChildren: () => import('../serien/serien.module').then(m => m.SerienPageModule)
          },
          {
            path: 'serie-details/:serieId',
            loadChildren: () => import('../serie-detail/serie-detail.module').then(m => m.SerieDetailPageModule)
          }
        ]
      },
      {
        path: 'animes',
        children: [
          {
            path: '',
            component: AnimesPage,
          },
          {
            path: 'anime-details/:animeId',
            loadChildren: () => import('../anime-detail/anime-detail.module').then(m => m.AnimeDetailPageModule)
          }
        ]
      },
      {
        path: 'pornos',
        children: [
          {
            path: '',
            component: PornosPage,
          },
          {
            path: 'porno-details/:pornoId',
            loadChildren: () => import('../porno-detail/porno-detail.module').then(m => m.PornoDetailPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/media/movies',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaTabsPageRoutingModule {}
