import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'app-card-ui-standard',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './card-ui-standard.component.html',
  styles: ``,
})
export class CardUiStandardComponent {
  @Input() dataCard!: {
    title: string;
    icon: LucideIconData;
    count: number;
    color: string;
  };

  @Input() loading!: boolean; 

  constructor() {}
}
