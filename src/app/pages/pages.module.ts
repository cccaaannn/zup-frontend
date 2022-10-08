import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePageComponent } from './message-page/message-page.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { MessageBubbleComponent } from '../components/message-bubble/message-bubble.component';
import { SearchUserPageComponent } from './search-user-page/search-user-page.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    MessagePageComponent,
    LoginPageComponent,
    MessageBubbleComponent,
    SearchUserPageComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ]
})
export class PagesModule { }
