import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile.routing';
import { SharedModule } from '@modules/shared/shared.module';
import { MaterialModule } from '@modules/material/material.module';

import { ProfileComponent } from './profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    ChangePasswordComponent
  ]
})
export class ProfileModule { }
