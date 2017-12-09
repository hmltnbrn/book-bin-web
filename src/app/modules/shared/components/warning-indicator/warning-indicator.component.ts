import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-warning-indicator',
  templateUrl: './warning-indicator.component.html',
  styleUrls: ['./warning-indicator.component.scss']
})
export class WarningIndicatorComponent {

  @Input() warningText: string;

  constructor() { }

}
