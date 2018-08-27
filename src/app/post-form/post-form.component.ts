import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from './../services/post.service';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  errorMessage: string;
  imageFileIsUploading = false;
  imageFileUrl: string;
  imageFileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  onUploadImageFile(file: File) {
    this.imageFileIsUploading = true;
    this.postService.uploadImageFile(file).then(
      (url: string) => {
        this.imageFileUrl = url;
        this.imageFileIsUploading = false;
        this.imageFileUploaded = true;
      }
    );
  }


  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z ]{2,20}/)]],
      content: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z ]{10,250}/)]],
      photo: [''],
    });
  }

  onSubmit() {
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const createdAt = Date.now().toString();
    const loveIts = 0;
    const newPost = new Post(title, content);
    newPost.loveIts = loveIts;
    newPost.createdAt = createdAt;
    if (this.imageFileUrl && this.imageFileUrl !== '') {
      newPost.photo = this.imageFileUrl;
    }
    this.postService.createNewPost(newPost);
    this.router.navigate(['posts/item']);
  }

  onBackToPosts() {
    this.router.navigate(['posts/item']);
  }

  detectImageFiles(event) {
    this.onUploadImageFile(event.target.files[0]);
  }

}

