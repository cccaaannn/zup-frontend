import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccessTokenInterceptor } from './shared/interceptors/access-token.interceptor';
import { AuthGuard } from './shared/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    PagesModule,
    HttpClientModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AccessTokenInterceptor, multi: true }, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
