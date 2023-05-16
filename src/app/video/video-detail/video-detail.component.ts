import { Component, Input } from '@angular/core';
import { Video } from "../video";
import { VideoService } from "../video.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent {
  @Input() video?: Video;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(): void {
    const path = String(this.route.snapshot.paramMap.get('path'));
    this.videoService.getVideo(path)
      .subscribe(video => this.video = video);
  }

  goBack(): void {
    this.location.back();
  }
}
