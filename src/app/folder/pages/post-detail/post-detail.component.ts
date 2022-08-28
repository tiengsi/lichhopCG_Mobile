import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/shared/models/post.model';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: PostModel;
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadPostDetaul();
  }

  loadPostDetaul(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.postService.getPostById(params.id).subscribe((response) => {
        if (response.isSuccess) {
          this.post = response.result;
        }
      });
    });
  }
}
