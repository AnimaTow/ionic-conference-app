import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import {IonInfiniteScroll, ModalController, IonRouterOutlet, IonList} from '@ionic/angular';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';
import {GenreFilterPage} from '../genre-filter/genre-filter';
import {ConferenceData} from '../../providers/conference-data';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  Movies = [];
  pagenumber = 1;
  pagelimit = 12;
  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  imageUrl = 'http://image.tmdb.org/t/p/w200';
  data: any;

  constructor(
    private api: ApiService,
    private router: Router,
    public confData: ConferenceData,
    public modalCtrl: ModalController,
    public routerOutlet: IonRouterOutlet
    ) { }

  ngOnInit() {
    this.api.getMovies(this.pagenumber, this.pagelimit).subscribe(res => {
      this.Movies = res;
      this.pagenumber++;
    })
  }

  updateMovies(search: boolean = false) {
    if(search === true) {
      this.api.getMovieSearch(this.queryText).subscribe(res => {
        this.Movies = res;
      })
    } else {
      this.pagenumber = 1;
      this.api.getMovies(this.pagenumber, this.pagelimit).subscribe(res => {
        this.Movies = res;
        this.pagenumber++;
      })
    }
  }

  async filterGenre() {
    const modal = await this.modalCtrl.create({
      component: GenreFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
      this.updateMovies();
    }
  }

  onMovieDetail(id: number) {
    this.router.navigate(['movie-detail', id]);
  }

  loadData(event) {
    setTimeout(() => {
      console.log(this.pagenumber);
      console.log(this.pagelimit);

      this.api.getMovies(this.pagenumber, this.pagelimit).subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          this.Movies.push(res[i]);
        }
      })

      console.log('Done');
      event.target.complete();
      this.pagenumber++;

      if (this.Movies.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
