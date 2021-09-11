import { Component, Input, OnInit } from '@angular/core';
import { MediaService } from '../shared/media.service';
import {Video} from '../shared/Video'
import {FaSymbol} from '@fortawesome/fontawesome-svg-core'
import { faRecycle, faSink } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
 @Input() 
 videos:Video[];
 fasink =faSink
 faRecycle= faRecycle
  constructor(public mediaService:MediaService) { 
  }
  
  videodata:any='';
  data;
  currentIndex = 0;
  currentItem ;
  ngOnInit() {
    this.mediaService.getVideos().subscribe(data=>{
      this.videodata = data
      console.log(data);
      this.videos =this.videodata.videodetails
      this.currentItem = this.videos[this.currentIndex];
    });
  }
  onPlayerReady(video:Video) {
    this.data = video;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }
  nextVideo() {
    this.currentIndex++;
    
    if (this.currentIndex === this.videos.length) {
      this.currentIndex = 0;
    }
    this.currentItem = this.videos[this.currentIndex];
  }
  playVideo() {
    this.data.play();
    console.log(this.data);
    
  }
  
  onClickPlaylistItem(video, index: number) {
    this.currentIndex = index;
    this.currentItem = video;
    console.log(this.currentIndex, this.currentItem);
    
  }
  deleteVideo(video){
    console.log(video);
    
    this.mediaService.deleteVideo(video._id);
  }
  }
 