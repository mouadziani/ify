import { Injectable } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../model/comment.model';

@Injectable()
export class CommentService {

  private url = 'api/comment';

  constructor(private api: BaseApiService) {}

  create(comment: Comment, discriminator: string): Observable<any> {
    return this.api.post(`${this.url}/${discriminator}`, comment);
  }

  getAll(discriminator: string, postId: number): Observable<Comment[]> {
    return this.api.get<Comment[]>(`${this.url}/${discriminator}/${postId}`);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.url}/${id}`);
  }
}
