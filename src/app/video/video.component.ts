import {Component, OnInit} from '@angular/core';
import {Video} from "./video";
import { VideoService } from "./video.service";
import { MessageService } from "../messages/message.service";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit{
  videos: Video[] = [];

  constructor(private videoService: VideoService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos(): void {
    this.videoService.getVideos()
      .subscribe(videos => this.videos)
  }

  add(path: string): void {
    path = path.trim();
    if (!path) { return; }
    this.videoService.addVideo({ path } as Video)
      .subscribe(video => {this.videos.push(video);});
  }
}
