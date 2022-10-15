import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MessagePageComponent } from './pages/message-page/message-page.component';
import { SearchUserPageComponent } from './pages/search-user-page/search-user-page.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: "search-user", component: SearchUserPageComponent, canActivate: [AuthGuard] },
  { path: "messages", component: MessagePageComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginPageComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
