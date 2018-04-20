import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { Principal } from '../../auth/principal.service';
import { Comment } from '../../model/comment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../user/user.model';

@Component({
  selector: 'ify-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input() postId: number;
  @Input() type: string;
  comments: Comment[];
  form: FormGroup;
  currentUser: User;

  constructor(
    private commentService: CommentService,
    private principal: Principal
  ) {}

  ngOnInit() {
    if (!this.postId || !this.type) {
      throw new Error();
    }
    this.form = new FormGroup({
      'text': new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    });
    this.principal.identity().then(account => {
      this.currentUser = account;
      this.loadAll();
    });
  }

  ngOnChanges() {
    this.loadAll();
  }

  deleteComment(id: number) {
    this.commentService.delete(id).subscribe(() => {
      this.loadAll();
    });
  }

  createComment() {
    const comment = new Comment();
    comment.text = this.form.value.text;
    comment.postId = this.postId;
    this.commentService.create(comment, this.type).subscribe(() => {
      this.loadAll();
    });
  }

  private loadAll() {
    this.commentService.getAll(this.type, this.postId).subscribe(res => {
      this.comments = res;
      this.form.reset();
    });
  }
}
