import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@services/guards/auth.guard.service';

import { ProfileResolver } from './services/profile.resolver.service';

import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { 
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      profile: ProfileResolver
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [
    ProfileResolver
  ]
})
export class ProfileRoutingModule { }
