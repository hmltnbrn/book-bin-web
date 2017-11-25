import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { SharedModule } from './modules/shared/shared.module';

import { AccountService } from './services/account.service';
import { StorageService } from './services/storage.service';

import { AuthGuard } from './services/guards/auth.guard.service';
import { NoAuthGuard } from './services/guards/noauth.guard.service';

import { AuthInterceptor } from './services/interceptors/auth.interceptor.service';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ForgotUsernameComponent } from './components/forgot-username/forgot-username.component';
import { InternalErrorComponent } from './components/internal-error/internal-error.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    WrapperComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ActivateAccountComponent,
    AutofocusDirective,
    ForgotUsernameComponent,
    InternalErrorComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AccountService,
    StorageService,
    AuthGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
