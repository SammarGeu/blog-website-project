import { Component } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { CommentFormComponent } from '../../comments/comment-form/comment-form.component';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-single-post',
  imports: [PostCardComponent,CommentFormComponent,CommentListComponent,DatePipe,NgFor,NgIf],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})
export class SinglePostComponent {

  postId: string = '';

  postData:any;
  similarPostArray:Array<object>=[];

  constructor(private route:ActivatedRoute,private postService:PostService) {
    // This is the constructor of the SinglePostComponent
    // You can initialize any properties or services here if needed

    
  
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((val) => {
      const id = val['id'];  // get post ID from route
    this.postId = id;      // ✅ assign postId here


      this.postService.countViews(val['id']);
      // Here you can access the post ID from the route parameters
      this.postService.loadOnePost(val['id']).subscribe(post =>{

        this.postData=post;
        this.loadSimilarPost(this.postData.category.categoryId);
        //console.log(post);
      })
      // You can then use this ID to fetch the post data from your service
      // For example: this.postService.getPostById(val['id']).subscribe(post => { ... });
    });
  }

  loadSimilarPost(catId:string){
    this.postService.loadSimilar(catId).subscribe(val =>{

      this.similarPostArray=val;

    })
  }

}
