import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePageComponent } from './message-page/message-page.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './auth-pages/login-page/login-page.component';
import { MessageBubbleComponent } from '../components/message-bubble/message-bubble.component';
import { SearchUserPageComponent } from './search-user-page/search-user-page.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SignupPageComponent } from './auth-pages/signup-page/signup-page.component';
import { RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './auth-pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth-pages/reset-password/reset-password.component';
import { VerifyAccountComponent } from './auth-pages/verify-account/verify-account.component';
import { ResendVerificationComponent } from './auth-pages/resend-verification/resend-verification.component';
import { LinkyModule } from 'ngx-linky';

@NgModule({
  declarations: [
    MessagePageComponent,
    LoginPageComponent,
    MessageBubbleComponent,
    SearchUserPageComponent,
    SignupPageComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    VerifyAccountComponent,
    ResendVerificationComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    RouterModule,
    LinkyModule
  ]
})
export class PagesModule { }
