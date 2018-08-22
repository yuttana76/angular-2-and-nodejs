import { PostsService } from './../posts.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  spinnerLoading = false;
  private mode = 'create';
  private postId: string;
  post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.spinnerLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
        this.spinnerLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });

      } else {
        this.mode = 'create';
        this.postId = null;
      }

    });
  }

  onSavePost(form: NgForm) {

    if (form.invalid) {
      return true;
    }

    this.spinnerLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
