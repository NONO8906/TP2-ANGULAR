import {Component, Injectable, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable()
export class AppComponent implements OnInit {


  constructor(private router: Router) {
    const config = {
      apiKey: "AIzaSyCY09JDubGWzZVtWdRpAJVYKiD1es4IPTo",
      authDomain: "open-projet.firebaseapp.com",
      databaseURL: "https://open-projet.firebaseio.com",
      projectId: "open-projet",
      storageBucket: "open-projet.appspot.com",
      messagingSenderId: "241022351477"
    };
    firebase.initializeApp(config);
  }

  ngOnInit() {
    this.router.navigate(['posts/item']); }
}
