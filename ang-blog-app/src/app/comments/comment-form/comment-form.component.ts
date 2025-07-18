import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogComment } from '../../models/Blogcom';
import { CommentService } from '../../services/comments.service';
import { serverTimestamp } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html'
})
export class CommentFormComponent {
  @Input() postID!: string;
  @Input() parentId: string | undefined;

  @Output() commentAdded = new EventEmitter<void>(); // ✅ emits event when comment/reply is added

  commentForm: FormGroup;

  constructor(private fb: FormBuilder, private commentService: CommentService,private toastr: ToastrService) {
    this.commentForm = this.fb.group({
      username: [''],
      content: ['']
    });
  }

  addComment() {
    const { username, content } = this.commentForm.value;

    const comment: BlogComment = {
      postID: this.postID,
      parentId: this.parentId ?? null, // ✅ handle replies
      
      username,
      content,
      createdAt:new Date()     // ✅ use Firestore timestamp
    };

    this.commentService.addComment(comment).then(() => {
      this.commentForm.reset();

      this.toastr.success('Comment added successfully!'); // ✅ use Toastr for success message
      this.commentAdded.emit();       // ✅ notify parent component
    });
  }
}
