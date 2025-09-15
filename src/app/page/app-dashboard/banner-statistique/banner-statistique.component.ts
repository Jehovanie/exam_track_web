import { Component, input, computed } from '@angular/core';
import {
  LucideAngularModule,
  CircleCheckBig,
  ClipboardList,
  X,
  Clock4,
} from 'lucide-angular';
import { CardUiStandardComponent } from './card-ui-standard/card-ui-standard.component';
import { CommonModule } from '@angular/common';
import { ExamStats } from '../../../@core/models/exam.type';

@Component({
  standalone: true,
  selector: 'app-banner-statistique',
  imports: [LucideAngularModule, CardUiStandardComponent, CommonModule],
  templateUrl: './banner-statistique.component.html',
  styles: ``,
})
export class BannerStatistiqueComponent {
  readonly Clock4 = Clock4;
  readonly X = X;
  readonly ClipboardList = ClipboardList;
  readonly CircleCheckBig = CircleCheckBig;

  exam_stats = input.required<ExamStats>(); // réactif
  loading = input<boolean>(true);

  all_stats = computed(() => {
    const s = this.exam_stats();
    return [
      {
        title: 'Confirmer',
        icon: this.CircleCheckBig,
        count: s.byStatus.confirm,
        color: '#55cc81',
      },
      {
        title: 'A organiser',
        icon: this.ClipboardList,
        count: s.byStatus.in_organised,
        color: '#f67219',
      },
      {
        title: 'Annulé',
        icon: this.X,
        count: s.byStatus.canceled,
        color: 'red',
      },
      {
        title: 'En recherche de place',
        icon: this.Clock4,
        count: s.byStatus.in_search_place,
        color: '#3383fe',
      },
    ];
  });
}
