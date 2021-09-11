import { Component, Input, OnInit, Output } from '@angular/core';
import { Video } from 'src/app/shared/Video';

@Component({
  selector: 'app-video-child',
  templateUrl: './video-child.component.html',
  styleUrls: ['./video-child.component.css']
})
export class VideoChildComponent implements OnInit { 
  constructor() { }
  @Input() video:Video
  ngOnInit(): void {
  }
  

}
