import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExamService } from '../../../../@core/services/data/exam.service';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styles: ``,
})
export class PaginationComponent {
  @Input() totalItems = 0; // total d'éléments
  @Input() pageSize = 10; // nombre par page
  @Input() currentPage = 1; // page courante

  constructor(public ex_s: ExamService) {}

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  changePage(wish_page: number | string) {
    const page =
      typeof wish_page === 'string' ? parseInt(wish_page) : wish_page;

    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.ex_s.changeCurrentpage(page);
    }
  }

  get pagesToShow(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: (number | string)[] = [];

    if (total <= 5) {
      // si peu de pages, toutes afficher
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push('...');
      }

      pages.push(total);
    }

    return pages;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.ex_s.changeCurrentpage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.ex_s.changeCurrentpage(this.currentPage + 1);
    }
  }

}
