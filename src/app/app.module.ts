import {
  MatButtonModule,
  MatCardModule ,
  MatInputModule,
  MatToolbarModule,
  MatExpansionModule
} from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { FormsModule } from '../../node_modules/@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.compopnent';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
