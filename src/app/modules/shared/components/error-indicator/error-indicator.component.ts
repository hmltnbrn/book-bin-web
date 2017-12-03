import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-indicator',
  templateUrl: './error-indicator.component.html',
  styleUrls: ['./error-indicator.component.scss']
})
export class ErrorIndicatorComponent {

  @Input() errorText: string;

  constructor() { }

}
