import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movie = null;
  ios: boolean;
  showPlayMovie: boolean;
  downloadMovie: boolean;
  showPlayTrailer: boolean;
  platformcheck: string;
  streamactive: boolean;
  downloadactive: boolean;
  desktopactive: boolean;
  androidactive: boolean;
  iosactive: boolean;
  options: StreamingVideoOptions;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private device: Device,
    public platform: Platform,
    private transfer: FileTransfer,
    private file: File,
    private streamingMedia: StreamingMedia
  ) { }

  // @ts-ignore

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('movieId');
    this.api.getMovieDetails(id).subscribe(res => {
      console.log(res);
      this.movie = res;
    })
      if(this.platform.is('desktop')) {
        this.streamactive = true;
        this.downloadactive = true;
        this.desktopactive = true;
        this.androidactive = false;
        this.iosactive = false;
      } else if (this.platform.is('android')) {
        this.streamactive = true;
        this.downloadactive = true;
        this.desktopactive = false;
        this.androidactive = true;
        this.iosactive = false;
      } else if (this.platform.is('ios')) {
        this.streamactive = true;
        this.downloadactive = true;
        this.desktopactive = false;
        this.androidactive = false;
        this.iosactive = true;
      } else {
        this.streamactive = false;
        this.downloadactive = false;
        this.desktopactive = false;
        this.androidactive = false;
        this.iosactive = false;
      }
  }

  movieClick(item: string) {
    if(item === 'stream') {
      console.log('Clicked', item);
      console.log('Device UUID is: ' + this.platform.is('desktop'));
      console.log('Device UUID is: ' + this.platform.platforms());
      if(this.desktopactive === true) {
        console.log('Strem nicht auf Desktop Unterstützt');

      }
      if(this.androidactive === true) {
        const options: StreamingVideoOptions = {
          successCallback: () => { console.log('Video played') },
          errorCallback: (e) => { console.log('Error streaming') },
          orientation: 'landscape',
          shouldAutoClose: true,
          controls: true
        };
        this.streamingMedia.playVideo('https://os-up.com/SampleVideo_1280x720_2mb.mp4', options);
      }
      if(this.iosactive === true) {
        const options: StreamingVideoOptions = {
          successCallback: () => { console.log('Video played') },
          errorCallback: (e) => { console.log('Error streaming') },
          orientation: 'landscape',
          shouldAutoClose: true,
          controls: true
        };
        this.streamingMedia.playVideo('https://os-up.com/SampleVideo_1280x720_2mb.mp4', options);
      }


    } else if (item === 'download') {
      console.log('Clicked', item);
      const fileTransfer: FileTransferObject = this.transfer.create();
      const url = 'https://os-up.com/SampleVideo_1280x720_2mb.mp4';
      fileTransfer.download(url, this.file.applicationDirectory + 'SampleVideo_1280x720_2mb.mp4').then((entry) => {
        console.log('download complete: ' + entry.toURL());
      }, (error) => {
        console.log('download ERROR: ' + JSON.stringify(error));
      });
    } else {
      console.log('Clicked', 'else ;(((');
    }
  }


  updateMovies() {
  }

  async filterGenre() {
  }
}
