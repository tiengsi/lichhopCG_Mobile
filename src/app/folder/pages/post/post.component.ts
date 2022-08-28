import { CategoryService } from './../../../shared/services/category.service';
import { PostService } from './../../../shared/services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParamsModel } from 'src/app/shared/models/query-params.model';
import { PostModel } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  categoryCode: string;
  page = 1;
  pageSize = 10;
  posts: PostModel[] = [];
  totalCount = 0;
  count = 0;
  categoryName = 'Tin';
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadCategory();
    this.loadPostByCategory();
  }

  loadCategory(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryCode = params.categoryCode;
      this.categoryService.getByCategoryCode(this.categoryCode).subscribe(response => {
        if (response.isSuccess) {
          this.categoryName = response.result;
        }
      });
    });
  }

  loadPostByCategory(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryCode = params.categoryCode;
      const filter = {
        categoryCode: params.categoryCode,
      };
      const queryParams = new QueryParamsModel(
        filter,
        'Asc',
        'UserName',
        this.page,
        this.pageSize
      );

      this.isLoading = true;
      this.postService.getAll(queryParams).subscribe((response) => {
        if (response.isSuccess) {
          this.posts = response.result.items;
          this.totalCount = response.result.totalCount;
          this.count = response.result.count;
          this.isLoading = false;
        }
      });
    });
  }
}
