import { Component, Input } from '@angular/core';
import { ExamType } from '../../../../@core/models/exam.type';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  MapPin,
  User,
  CalendarDays,
  Clock4,
  Hourglass,
  X,
  Send,
  Check,
  LucideIconData,
} from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'app-list-item',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './list-item.component.html',
  styles: ``,
})
export class ListItemComponent {
  readonly MapPin = MapPin;
  readonly User = User;
  readonly CalendarDays = CalendarDays;
  readonly Clock4 = Clock4;
  readonly Hourglass = Hourglass;
  readonly X = X;
  readonly Send = Send;
  readonly Check = Check;

  @Input() exam!: ExamType;

  examStatus: {
    text: string;
    icon: LucideIconData;
    textColor: string;
    bgColor: string;
  } = {
    text: 'Confirmé',
    icon: Check,
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
  };

  ngOnInit(): void {
    switch (this.exam.status) {
      case 'in_search_place':
        this.examStatus = {
          text: 'En recherche de place',
          icon: Hourglass,
          textColor: 'text-gray-600',
          bgColor: 'bg-gray-50',
        };
        break;
      case 'confirm':
        this.examStatus = {
          text: 'Confirmé',
          icon: Check,
          textColor: 'text-green-600',
          bgColor: 'bg-green-50',
        };
        break;
      case 'in_organised':
        this.examStatus = {
          text: 'A organiser',
          icon: Send,
          textColor: 'text-orange-600',
          bgColor: 'bg-orange-50',
        };
        break;
      case 'canceled':
        this.examStatus = {
          text: 'Annulé',
          icon: X,
          textColor: 'text-red-600',
          bgColor: 'bg-red-50',
        };
        break;
      default:
        this.examStatus = {
          text: 'A organiser',
          icon: Send,
          textColor: 'text-orange-600',
          bgColor: 'bg-orange-50',
        };
    }
  }
}
