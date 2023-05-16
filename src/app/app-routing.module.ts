import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { VideoDetailComponent } from "./video/video-detail/video-detail.component";

const routes: Routes = [
  { path: 'videos', component: VideoComponent },
  { path: 'videos/:path', component: VideoDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
