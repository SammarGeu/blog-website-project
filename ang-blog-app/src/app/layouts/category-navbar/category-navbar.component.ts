import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-navbar',
  imports: [CommonModule, NgFor,RouterLink],
  standalone: true, 
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.scss'
})
export class CategoryNavbarComponent {

  categoryArray:Array<any> = [];

  constructor(private categoryService:CategoriesService) {
    // This is the constructor of the CategoryNavbarComponent
    // You can initialize any properties or services here if needed
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoryService.loadData().subscribe((val) => {
        this.categoryArray = val;
    }); 
  }

}
