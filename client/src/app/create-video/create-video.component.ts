import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaService } from '../shared/media.service';

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent implements OnInit {
  form:FormGroup;
  percent:any=0;
  constructor(
    public fb:FormBuilder,
    public router:Router,
    public mediaService:MediaService
  ) { 
    this.form =this.fb.group({
      title:[''],
      videoUrl:[null],
      imageUrl:[null],
      description:['']
    })
  }
  ngOnInit(): void {
  }
   
  uploadFile(event:Event){

    const file =(event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      imageUrl:file
    })
    this.form.get('imageUrl')?.updateValueAndValidity();
  }
  uploadVideo(event:Event){

    const file =(event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      videoUrl:file
    })
    this.form.get('videoUrl')?.updateValueAndValidity();
  }
  submitForm(){
    this.mediaService.addVideo(
      this.form.value.title,
      this.form.value.videoUrl,
      this.form.value.imageUrl,
      this.form.value.description
    ).subscribe((event:HttpEvent<any>)=>{
      switch(event.type){
        case HttpEventType.Sent:
          console.log('Request has been made');
          break;
        case HttpEventType.UploadProgress: 
        console.log(`uploaded ${this.percent}`);
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received');
          break;
        case HttpEventType.Response:
            console.log('User successfully created',event.body);
            this.percent = false;
            this.router.navigate(['videos'])
            break;    
      }
    })
  }
}
