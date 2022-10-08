import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MessagePageComponent } from './pages/message-page/message-page.component';
import { SearchUserPageComponent } from './pages/search-user-page/search-user-page.component';

const routes: Routes = [
  { path: "search-user", component: SearchUserPageComponent },
  { path: "messages", component: MessagePageComponent },
  { path: "login", component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
