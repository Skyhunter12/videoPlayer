import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsComponent, VgControlsModule} from '@videogular/ngx-videogular/controls'
import {VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play'
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering'
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoChildComponent } from './video-list/video-child/video-child.component';
import { CreateVideoComponent } from './create-video/create-video.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
@NgModule({
  declarations: [
    AppComponent,
    VideoListComponent,
    VideoChildComponent,
    CreateVideoComponent  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
