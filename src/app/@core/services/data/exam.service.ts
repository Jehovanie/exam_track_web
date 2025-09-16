import { computed, effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environements/environement';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ExamCreateType, ExamStats, ExamType } from '../../models/exam.type';
import { AbstractService } from './abrastract.service';

interface ExamPage {
  items: ExamType[];
  total: number;
  page: number;
  itemsPerPage: number;
}

interface ParamsFetchExam {
  page: number;
  itemsPerPage: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExamService extends AbstractService {
  constructor() {
    super();
  }

  private readonly dataExams = signal<ExamPage>({
    items: [],
    total: 0,
    page: 1,
    itemsPerPage: 10,
  });
  private readonly loadingList = signal<boolean>(true);
  private readonly _examCurrentPage = signal<number>(1);

  readonly error = signal<string | null>(null);
  readonly dataExamsPublic = computed(() => this.dataExams());
  readonly loadingListPublic = computed(() => this.loadingList());

  readonly totalPages = computed(() =>
    Math.ceil(this.dataExams().total / this.dataExams().itemsPerPage)
  );

  readonly itemsPerPage = computed(() => this.dataExams().itemsPerPage);
  readonly examCurrentPage = computed(() => this._examCurrentPage());

  readonly examCurrentList = computed(() => {
    if (
      this.dataExams().items.length <
      this.examCurrentPage() * this.itemsPerPage()
    ) {
      return [];
    }

    const page = this._examCurrentPage();
    const size = this.itemsPerPage();
    const items = this.dataExams().items;

    return items.slice((page - 1) * size, page * size);
  });

  private readonly _prefetchIfEmpty = effect(
    () => {
      if (
        this.examCurrentList().length === 0 &&
        this.examCurrentPage() < this.totalPages() + 1
      ) {
        this.setDataExams({
          page: this._examCurrentPage(),
          itemsPerPage: this.itemsPerPage(),
        });
      }
    },
    { allowSignalWrites: true }
  );

  public changeCurrentpage(page: number) {
    this._examCurrentPage.update(() => page);
  }

  readonly examStats = signal<ExamStats>({
    total: 0,
    byStatus: {
      canceled: 0,
      confirm: 0,
      in_organised: 0,
      in_search_place: 0,
    },
  });
  readonly loadingStat = signal<boolean>(true);
  readonly errorStat = signal<string | null>(null);

  readonly loadingAction = signal<boolean>(false);
  readonly errorAction = signal<string | null>(null);

  readonly totalExamSoon = computed(
    () =>
      this.examStats().byStatus.confirm +
      this.examStats().byStatus.in_organised +
      this.examStats().byStatus.in_search_place
  );

  setDataExams(
    params: ParamsFetchExam = {
      page: 1,
      itemsPerPage: 10,
    }
  ) {
    const queryString = new URLSearchParams(params as any).toString();
    this.loadingList.set(true);

    const url = queryString ? `/exams?${queryString}` : `/exams`;

    this.GET<ExamPage>(url)
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la recuperation de tous les examens :',
            error
          );
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => {
          this.loadingList.set(false);
          this.dataExams.update((prev) => ({
            ...prev,
            items: [...prev.items, ...response.items],
            page: response.page,
            itemsPerPage: response.itemsPerPage,
            total: response.total,
          }));
        },
        error: (err) => {
          this.loadingList.set(false);
          this.error.set(err?.message ?? 'Erreur réseau');
          this.errorStat.set(err?.message ?? 'Erreur réseau');
        },
      });
  }

  setDataStatExam() {
    this.loadingStat.set(true);

    this.GET<ExamStats>(`/exams/stats`)
      .pipe(
        catchError((error) => {
          console.error(
            'Erreur lors de la récuperation de statistique des examens :',
            error
          );
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => {
          this.loadingStat.set(false);
          this.examStats.set(response as ExamStats);
        },
        error: (err) => {
          this.loadingStat.set(false);
          this.error.set(err?.message ?? 'Erreur réseau');
        },
      });
  }

  createExam(exam: ExamCreateType) {
    this.loadingAction.set(true);
    return this.POST<ExamCreateType>(`/exams`, exam).pipe(
      tap((response) => {
        this.loadingAction.set(false);
        this.addDataExams(response as ExamType);
        this.addExamState(response.status);
      }),
      catchError((err) => {
        this.errorAction.set(err?.message ?? 'Erreur réseau');
        this.loadingAction.set(false);
        return throwError(() => err);
      })
    );
  }

  private addDataExams(new_exam: ExamType) {
    this.dataExams.update((prev) => ({
      ...prev,
      items: [new_exam as ExamType, ...prev.items],
    }));
  }

  private addExamState(status: string) {
    this.examStats.update((prev) => ({
      ...prev,
      total: prev.total + 1,
      byStatus: {
        ...prev.byStatus,
        canceled:
          status === 'canceled'
            ? prev.byStatus.canceled + 1
            : prev.byStatus.canceled,
        confirm:
          status === 'confirm'
            ? prev.byStatus.confirm + 1
            : prev.byStatus.confirm,
        in_organised:
          status === 'in_organised'
            ? prev.byStatus.in_organised + 1
            : prev.byStatus.in_organised,
        in_search_place:
          status === 'in_search_place'
            ? prev.byStatus.in_search_place + 1
            : prev.byStatus.in_search_place,
      },
    }));
  }
}
