import { Component } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-single-category',
  imports: [PostCardComponent,NgFor],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.scss'
})
export class SingleCategoryComponent {


  categoryObj:any;



  postArray:Array<object> = [];



  constructor(private route:ActivatedRoute,private postService:PostService) {
    // This is the constructor of the SingleCategoryComponent
    // You can initialize any properties or services here if needed
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((val) => {
      this.categoryObj = val;
      this.postService.loadCategoryPosts(val['id']).subscribe(post =>{
        this.postArray = post;
      })
    });
  }



}
