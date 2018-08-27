import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { PostService } from './services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { PostFormComponent } from './post-form/post-form.component';


const appRoutes: Routes = [
  { path: 'posts/item', component: PostListItemComponent },
  { path: 'post-form', component: PostFormComponent },
  { path: '', component: PostListItemComponent , pathMatch: 'full' },
  { path: '**', redirectTo: PostListItemComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListItemComponent,
    PostFormComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
