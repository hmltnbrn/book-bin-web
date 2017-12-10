import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-indicator',
  templateUrl: './info-indicator.component.html',
  styleUrls: ['./info-indicator.component.scss']
})
export class InfoIndicatorComponent {

  @Input() infoText: string;

  constructor() { }

}
