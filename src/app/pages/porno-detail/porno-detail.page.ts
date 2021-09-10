import { Component, OnInit } from '@angular/core';
import {StreamingMedia, StreamingVideoOptions} from '@ionic-native/streaming-media/ngx';
import {ApiService} from '../../service/api.service';
import {ActivatedRoute} from '@angular/router';
import {Device} from '@ionic-native/device/ngx';
import {Platform} from '@ionic/angular';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';

@Component({
  selector: 'app-porno-detail',
  templateUrl: './porno-detail.page.html',
  styleUrls: ['./porno-detail.page.scss'],
})
export class PornoDetailPage implements OnInit {
  movie = null;
  platformcheck: string;
  streamactive: boolean;
  downloadactive: boolean;
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('pornoId');
    this.api.getPornoDetails(id).subscribe(res => {
      console.log(res);
      this.movie = res;
    })
    if(this.platform.is('desktop')) {
      this.streamactive = true;
      this.downloadactive = true;
    } else if (this.platform.is('android')) {
      this.streamactive = true;
      this.downloadactive = true;
    } else if (this.platform.is('ios')) {
      this.streamactive = true;
      this.downloadactive = true;
    } else {
      this.streamactive = true;
      this.downloadactive = true;
    }
  }

  movieClick(item: string) {
    if(item === 'stream') {
      console.log('Clicked', item);
      console.log('Device UUID is: ' + this.platform.is('desktop'));
      console.log('Device UUID is: ' + this.platform.platforms());
      let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming') },
        orientation: 'landscape',
        shouldAutoClose: true,
        controls: false
      };
      this.streamingMedia.playVideo('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4', options);
    } else if (item === 'download') {
      console.log('Clicked', item);
      const fileTransfer: FileTransferObject = this.transfer.create();
      const url = 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4';
      fileTransfer.download(url, this.file.applicationDirectory + 'file_example_MP4_480_1_5MG.mp4').then((entry) => {
        console.log('download complete: ' + entry.toURL());
      }, (error) => {
        console.log('download ERROR: ' + JSON.stringify(error));
      });
    } else {
      console.log('Clicked', 'else ;(((');
    }
  }

}
