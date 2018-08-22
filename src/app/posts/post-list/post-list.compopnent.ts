import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
selector: 'app-post-list',
templateUrl: './post-list.component.html',
styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {

    posts: Post[] = [];
    private postsSub: Subscription;
    spinnerLoading = false;

    constructor(public postsService: PostsService) {}

    ngOnInit() {
        this.spinnerLoading = true;
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.spinnerLoading = false;
            this.posts = posts;
        });
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId    );
    }
    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}
