import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import {Subscription} from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
selector: 'app-post-list',
templateUrl: './post-list.component.html',
styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {

    posts: Post[] = [];
    private postsSub: Subscription;
    spinnerLoading = false;
    currentPage = 1;
    totalPosts = 10;
    postsPerPage = 2;
    pageSizeOptions = [1, 2, 5, 10];
    userAuthenticated = false;
    userId: string;
    private authListenerSubs: Subscription;

    constructor(public postsService: PostsService, private authService: AuthService) {}

    ngOnInit() {

        this.userId = this.authService.getUserId();
        this.spinnerLoading = true;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.spinnerLoading = false;
            this.posts = posts;
        });

        this.userAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });

    }

    onChangedPage(pageData: PageEvent) {
      console.log(pageData);
      this.currentPage =  pageData.pageIndex + 1;
      this.postsPerPage =  pageData.pageSize;
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId    );
    }
    ngOnDestroy() {
        this.postsSub.unsubscribe();
        this.authListenerSubs.unsubscribe();
    }
}
