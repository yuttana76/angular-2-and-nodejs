import { Post } from './post.model';
import { Injectable } from '../../../node_modules/@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { Post } from '../../../node_modules/@types/selenium-webdriver/http';

@Injectable({ providedIn: 'root' })
export class PostsService {

    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient , private router: Router) { }

    getPosts(postsPerPage: number, currentPage: number) {
      const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

      console.log('queryParams>' + queryParams);

        this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts' + queryParams)
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        id: post._id,
                        imagePath: post.imagePath,
                        creator: post.creator
                    };
                });
            }))
            .subscribe((transformedPosts) => {
              console.log(transformedPosts);
                this.posts = transformedPosts;
                this.postUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    getPost(id: string) {
        return this.http.get<{_id: string; title: string; content: string; imagePath: string; creator: string }>
        ('http://localhost:3000/api/posts/' + id );
    }

    addPost(title: string, content: string, image: File) {

        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image);

        this.http
            .post<{ message: string, post: Post }>('http://localhost:3000/api/posts',
            postData)
            .subscribe(responseData => {
                const post: Post = {
                    id: responseData.post.id,
                    title: title,
                    content: content,
                    imagePath: responseData.post.imagePath,
                    creator: null
                };
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    updatePost(id: string, title: string, content: string) {
        const post: Post = { id: id, title: title, content: content , imagePath: null, creator: null};
        this.http
            .put('http://localhost:3000/api/posts/' + id, post)
            .subscribe(response => {
                const updatedPosts = [...this.posts];
                const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
                updatedPosts[oldPostIndex] = post;
                this.posts = updatedPosts;
                this.postUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }

    deletePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId)
            .subscribe(() => {
                console.log('Deleted!');
                const updatedPosts = this.posts.filter(post => post.id !== postId);
                this.posts = updatedPosts;
                this.postUpdated.next([...this.posts]);
            });
    }
}
