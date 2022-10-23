import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/auth-pages/login-page/login-page.component';
import { MessagePageComponent } from './pages/message-page/message-page.component';
import { SearchUserPageComponent } from './pages/search-user-page/search-user-page.component';
import { SignupPageComponent } from './pages/auth-pages/signup-page/signup-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ForgetPasswordComponent } from './pages/auth-pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/auth-pages/reset-password/reset-password.component';
import { ResendVerificationComponent } from './pages/auth-pages/resend-verification/resend-verification.component';
import { VerifyAccountComponent } from './pages/auth-pages/verify-account/verify-account.component';
import { AppRoutes } from './shared/data/enums/routes';

const routes: Routes = [
  { path: AppRoutes.SEARCH_USER, component: SearchUserPageComponent, canActivate: [AuthGuard] },
  { path: AppRoutes.MESSAGES, component: MessagePageComponent, canActivate: [AuthGuard] },
  { path: AppRoutes.RESEND_VERIFICATION, component: ResendVerificationComponent },
  { path: AppRoutes.VERIFY_ACCOUNT, component: VerifyAccountComponent },
  { path: AppRoutes.FORGET_PASSWORD, component: ForgetPasswordComponent },
  { path: AppRoutes.RESET_PASSWORD, component: ResetPasswordComponent },
  { path: AppRoutes.LOGIN, component: LoginPageComponent },
  { path: AppRoutes.SIGNUP, component: SignupPageComponent },
  { path: '**', redirectTo: AppRoutes.LOGIN }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
