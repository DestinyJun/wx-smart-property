import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './common/services/auth.interceptor';
import { ErrorRemindComponent } from './error-remind/error-remind.component';
import {LoadingModule} from './common/components/loading/loading.module';
import { LoginComponent } from './login/login.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    ErrorRemindComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingModule,
  ],
  providers: [
    // 使用http拦截器
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy}

],
  bootstrap: [AppComponent]
})
export class AppModule { }
