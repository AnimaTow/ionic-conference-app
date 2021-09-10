import { Component, OnInit, ViewChild } from '@angular/core';
import {ApiService} from '../../service/api.service';
import {Router} from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-animes',
  templateUrl: './animes.page.html',
  styleUrls: ['./animes.page.scss'],
})
export class AnimesPage implements OnInit {
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
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.api.getAnimes(this.pagenumber, this.pagelimit).subscribe(res => {
      console.log('Top Animes:', res);
      this.Movies = res;
    })
  }
  updateSchedule() {
  }

  loadData(event) {
    setTimeout(() => {
      console.log(this.pagenumber);
      console.log(this.pagelimit);

      this.api.getAnimes(this.pagenumber, this.pagelimit).subscribe(res => {
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
