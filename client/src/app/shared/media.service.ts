import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Video } from './Video';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  baseurl ="http://localhost:3000/videos"
  constructor(private http:HttpClient) { }
  videodata :any ;
  videos:Video[]
  getVideos(){
    return this.http.get(this.baseurl)
  }
  addVideo(title:string,videoUrl:File, imageUrl:File,description:string):Observable<any>{
    let formData:any = new FormData();
    formData.append('mediaTitle',title);
    formData.append('videoUrl',videoUrl);
    formData.append('imageUrl',imageUrl);
    formData.append('description',description);
    return this.http.post<Video>(`${this.baseurl}`,formData,
    {reportProgress:true,
    observe:'events'})
  }
  errorMime(error:HttpErrorResponse){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message
    }else{
      errorMessage =`Error message ${error.status}\n message: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage)    
  }
  deleteVideo(_id){
    console.log(_id.toString());
    
    return this.http.delete(`${this.baseurl}/${_id}`).subscribe(() => console.log('Delete successful'));
  }  
}
