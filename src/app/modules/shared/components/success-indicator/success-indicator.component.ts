import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-indicator',
  templateUrl: './success-indicator.component.html',
  styleUrls: ['./success-indicator.component.scss']
})
export class SuccessIndicatorComponent {

  @Input() successText: string;

  constructor() { }

}
