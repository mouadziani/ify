import { Injectable } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { Video } from '../model/video.model';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class VideoService {

  private url = 'api/video';

  constructor(private api: BaseApiService) {}

  create(video: Video): Observable<any> {
    return this.api.post(this.url, video);
  }

  update(video: Video): Observable<any> {
    return this.api.put(this.url, video);
  }

  find(id: number): Observable<Video> {
    return this.api.get<Video>(`${this.url}/${id}`);
  }

  query(req?: any): Observable<HttpResponse<Video[]>> {
    return this.api.getWithPagination<Video[]>(this.url, req);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.url}/${id}`);
  }
}
