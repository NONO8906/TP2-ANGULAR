import {Injectable, Input} from '@angular/core';
import {Post} from '../models/post.model';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';
import DataSnapshot = firebase.database.DataSnapshot;



@Injectable()
export class PostService {

  PostsSubject = new Subject<Post[]>();
  Posts: Post[] = [];
  @Input() post: Post;
  loveIts: number ;

  constructor(
  ) {
    this.getPosts();
  }


  emitPosts() {
    this.PostsSubject.next(this.Posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.Posts);
  }

  getPosts() {
    firebase.database().ref('/posts').on('value', (data: DataSnapshot) => {
        this.Posts = data.val() ? data.val() : [];
        this.emitPosts();
      }
    );
  }

  createNewPost(newPost: Post) {
    this.Posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {
    if (post.photo) {
      const storageRef = firebase.storage().refFromURL(post.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const postIndexToRemove = this.Posts.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    this.Posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }


  uploadImageFile(file: File) {
    return new Promise(
      (resolve, reject) =>  {
        const almostUniqueFile = Date.now().toString();
        const upload = firebase.storage().ref().child('images/' + almostUniqueFile + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
          console.log('chargement...');
          },
          (error) => {
            console.log('erreur de chargement :' + error);
            reject();
          },
          () => {
          resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

}
