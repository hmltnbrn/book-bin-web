import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    MatProgressSpinnerModule
  ],
  declarations: [
    LoadingSpinnerComponent
  ],
  exports: [
    MatProgressSpinnerModule,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
