import { Injectable } from '@angular/core';
import { Video } from "./video";
import { VIDEOS } from "../mock-videos";
import { Observable, of } from "rxjs";
import { MessageService } from "../messages/message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videosUrl = 'http://localhost:8080/video';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messagesService: MessageService, private http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videosUrl)
      .pipe(
        tap(_ => this.log('fetched videos')),
        catchError(this.handleError<Video[]>('getVideos', []))
      );
  }

  getVideo(name: string): Observable<Video> {
    const url = `${this.videosUrl}/${name}`;
    return this.http.get<Video>(url).pipe(
      tap(_ => this.log(`fetched video ${name}`)),
      catchError(this.handleError<Video>(`getVideo ${name}`))
    );
  }

  /** POST: add a new hero to the server */
  addVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(this.videosUrl, video, this.httpOptions).pipe(
      tap((newVideo: Video) => this.log(`added hero w/ id=${newVideo.path}`)),
      catchError(this.handleError<Video>('addHero'))
    );
  }

  private log(message: string){
    this.messagesService.add(`HeroService: ${message}`)
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
