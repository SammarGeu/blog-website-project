import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogComment } from '../../models/Blogcom';
import { CommentService } from '../../services/comments.service';
import { Observable } from 'rxjs';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule, CommentFormComponent, CommentItemComponent, NgFor,FormsModule],
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  isEditing = false;
  editedContent = '';

  @Input() comment!: BlogComment;
  replies$!: Observable<BlogComment[]>;
  showReplyForm = false;

  @Output() commentDeleted = new EventEmitter<void>();

  constructor(private commentService: CommentService,private toastr:ToastrService) {}

  ngOnInit() {
    if (this.comment.createdAt instanceof Timestamp) {
      this.comment.createdAt = this.comment.createdAt.toDate();
    }
    this.loadReplies(); // ✅ Always load replies when comment is initialized
  }

  toggleReplyForm() {
    this.showReplyForm = !this.showReplyForm;
  }

  deleteComment() {
    const confirmDelete = confirm('Are you sure you want to delete this comment and all its replies?');
    if (confirmDelete && this.comment.id) {
      this.commentService.deleteCommentWithReplies(this.comment.id).then(() => {

    
        this.toastr.success('Comment and its replies deleted successfully.'); // ✅ Use Toastr for success message
        console.log('Comment and its replies deleted successfully.');
        this.commentDeleted.emit();
      }).catch(error => {
        console.error('Error deleting comment with replies:', error);
        this.toastr.error('Failed to delete comment and its replies.'); // ✅ Use Toastr for error message
      });
    }
  }

  // ✅ Called when a reply is added or deleted
  loadReplies() {
    this.replies$ = this.commentService.getReplies(this.comment.id!);
  }

  // ✅ When a nested reply is deleted
  onReplyDeleted() {
    this.loadReplies();
  }

  // ✅ When a new reply is added
  onReplyAdded() {
    this.showReplyForm = false;
    this.loadReplies(); 
  }



startEdit() {
  this.isEditing = true;
  this.editedContent = this.comment.content;
}

cancelEdit() {
  this.isEditing = false;
}

saveEdit() {
  if (!this.comment.id) return;
  this.commentService.updateComment(this.comment.id, this.editedContent).then(() => {
    this.isEditing = false;
    this.comment.content = this.editedContent; 
      this.toastr.success('Comment updated successfully.'); // ✅ Use Toastr for success message
      
    // update local content
    console.log('Comment updated');
  }).catch(err => {

    this.toastr.error('Failed to update comment.'); // ✅ Use Toastr for error message
    console.error('Failed to update comment:', err);
  });
}
}
