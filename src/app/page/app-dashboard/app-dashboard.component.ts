import { Component } from '@angular/core';
import { BannerStatistiqueComponent } from './banner-statistique/banner-statistique.component';
import { ListExamComponent } from './list-exam/list-exam.component';
import { ExamService } from '../../@core/services/data/exam.service';

@Component({
  selector: 'app-app-dashboard',
  standalone: true,
  imports: [BannerStatistiqueComponent, ListExamComponent],
  templateUrl: './app-dashboard.component.html',
  styles: ``,
})
export class AppDashboardComponent {
  constructor(public ex_s: ExamService) {}

  ngOnInit(): void {
    this.ex_s.setDataExams();
    this.ex_s.setDataStatExam();
  }
}
