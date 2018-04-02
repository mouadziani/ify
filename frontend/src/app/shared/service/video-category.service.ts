import { Injectable } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { Observable } from 'rxjs/Observable';
import { VideoCategory } from '../model/video-category.model';

@Injectable()
export class VideoCategoryService {

  private url = 'api/video-category';

  constructor(private api: BaseApiService) {}

  create(videoCategory: VideoCategory): Observable<any> {
    return this.api.post(this.url, videoCategory);
  }

  update(videoCategory: VideoCategory): Observable<any> {
    return this.api.put(this.url, videoCategory);
  }

  find(id: number): Observable<VideoCategory> {
    return this.api.get<VideoCategory>(`${this.url}/${id}`);
  }

  getAll(): Observable<VideoCategory[]> {
    return this.api.get<VideoCategory[]>(this.url);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.url}/${id}`);
  }
}
