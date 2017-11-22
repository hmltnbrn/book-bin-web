import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/guards/auth.guard.service';
import { NoAuthGuard } from './services/guards/noauth.guard.service';

import { AccountActivationResolver } from './components/activate-account/services/activation.resolver.service';

import { WrapperComponent } from './components/wrapper/wrapper.component';
import { MainComponent } from './components/main/main.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { ForgotUsernameComponent } from './components/forgot-username/forgot-username.component';
import { InternalErrorComponent } from './components/internal-error/internal-error.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'library',
        loadChildren: 'app/modules/library/library.module#LibraryModule',
        canLoad: [AuthGuard]
      }
    ]
  },
  {
    path: 'signin',
    component: SignInComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'signout',
    component: SignOutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'forgot-username',
    component: ForgotUsernameComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'activate-account/:token',
    component: ActivateAccountComponent,
    canActivate: [NoAuthGuard],
    resolve: {
      message: AccountActivationResolver
    }
  },
  {
    path: '500',
    component: InternalErrorComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    AccountActivationResolver
  ]
})
export class AppRoutingModule { }
