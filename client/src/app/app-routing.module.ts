import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateVideoComponent } from './create-video/create-video.component';
import { VideoListComponent } from './video-list/video-list.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'add-video'},
  {path:'add-video',component:CreateVideoComponent},
  //  {path:'add-video',component:},
  {path:'videos',component:VideoListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
