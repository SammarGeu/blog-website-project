import { Component } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { PostService } from '../../services/post.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [PostCardComponent,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  featuredPostsArray:Array<object> = []; 
  latestPostsArray:Array<object> = [];

  constructor(private postService:PostService) {
  } 

  ngOnInit(): void {
    this.postService.loadFeatured().subscribe((val) => {
     // console.log(val);
      this.featuredPostsArray = val;
    }   ); 



    this.postService.loadLatest().subscribe((val) => {
     // console.log(val);
      this.latestPostsArray = val;
    }   );
  }
}
