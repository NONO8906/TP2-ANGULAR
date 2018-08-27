import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Post} from '../models/post.model';
import {Router, ActivatedRoute} from '@angular/router';
import {PostService} from '../services/post.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit, OnDestroy {

  Posts: Post[];
  post: Post;
  PostsSubscription: Subscription;
  loveIts: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private postService: PostService) {}

  ngOnInit() {
    this.PostsSubscription = this.postService.PostsSubject.subscribe((Posts: Post[]) => { this.Posts = Posts;
    });
    this.postService.emitPosts();
    this.postService.getPosts();
  }

  onRemovePost(post: Post) {
    this.postService.removePost(post);
  }

  onLoveIt(post: Post) {
    this.post.loveIts = this.post.loveIts + 1;
  }

  onDontLoveIt(post: Post) {
    this.post.loveIts = this.post.loveIts - 1;
  }

  ngOnDestroy() {
    this.PostsSubscription.unsubscribe();
  }

}
