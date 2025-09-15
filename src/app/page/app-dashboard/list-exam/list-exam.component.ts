import { Component, Input, input } from '@angular/core';
import { HeadListComponent } from './head-list/head-list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ExamType } from '../../../@core/models/exam.type';
import { CommonModule } from '@angular/common';
import { ListItemSkeletonComponent } from './list-item-skeleton/list-item-skeleton.component';
import { PaginationComponent } from './pagination/pagination.component';

@Component({
  selector: 'app-list-exam',
  imports: [
    HeadListComponent,
    ListItemComponent,
    CommonModule,
    ListItemSkeletonComponent,
    PaginationComponent,
  ],
  templateUrl: './list-exam.component.html',
  styles: ``,
})
export class ListExamComponent {
  @Input() exams!: ExamType[];
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Input() loading!: boolean;
  @Input() error!: string | null;

  @Input() total!: number;
  @Input() exam_soon!: number;
  loading_stat = input<boolean>(true);
}
