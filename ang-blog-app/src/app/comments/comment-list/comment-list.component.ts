import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommentService } from '../../services/comments.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { BlogComment } from '../../models/Blogcom';
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'app-comment-list',
  standalone: true, 
  imports: [NgIf, AsyncPipe, NgFor, CommentItemComponent],
  templateUrl: './comment-list.component.html'
})
export class CommentListComponent implements OnInit {
  @Input() postID!: string;
  comments$!: Observable<BlogComment[]>;

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    this.loadComments(); // ✅ centralized loading logic
  }

  // loadComments() {
  //   console.log('Fetching comments for postID:', this.postID);
  //   this.comments$ = this.commentService.getCommentsByPostID(this.postID);
  // }

  loadComments() {
    console.log('Fetching comments for postID:', this.postID);
  
    this.comments$ = this.commentService.getCommentsByPostID(this.postID).pipe(
      map(comments => comments.filter(comment => !comment.parentId)) // ✅ filter top-level only
    );
  }

  refreshComments() {
    this.loadComments(); // ✅ refresh triggered by child
  }

  trackById(index: number, comment: BlogComment): string {
    return comment.id ?? index.toString();
  }
}
