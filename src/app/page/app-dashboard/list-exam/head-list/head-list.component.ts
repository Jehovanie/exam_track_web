import { Component, Input } from '@angular/core';
import { NewExamComponent } from '../../new-exam/new-exam.component';

@Component({
  selector: 'app-head-list',
  imports: [NewExamComponent],
  templateUrl: './head-list.component.html',
  styles: ``,
})
export class HeadListComponent {
  @Input() exam_soon!: number;
}
