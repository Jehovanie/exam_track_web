import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SwalComponent,
  SwalPortalTargets,
  SwalPortalDirective,
  SwalDirective,
} from '@sweetalert2/ngx-sweetalert2';
import { LucideAngularModule, RefreshCcw } from 'lucide-angular';
import { ExamService } from '../../../@core/services/data/exam.service';
import { ExamCreateType } from '../../../@core/models/exam.type';

@Component({
  standalone: true,
  selector: 'app-new-exam',
  imports: [
    CommonModule,
    SwalComponent,
    FormsModule,
    SwalDirective,
    SwalPortalDirective,
    LucideAngularModule,
  ], // Import what you need
  templateUrl: './new-exam.component.html',
  styles: ``,
})
export class NewExamComponent {
  public constructor(
    public readonly swalTargets: SwalPortalTargets,
    public ex_s: ExamService
  ) {}

  readonly RefreshCcw = RefreshCcw;

  @ViewChild('organizeSwal') organizeSwal!: SwalComponent;

  loading: boolean = false;

  // modèle simple pour ngModel
  form = {
    sutudentName: '',
    examLocation: '',
    examDate: '',
    examTime: '',
    examStatus: '',
  };

  open() {
    this.organizeSwal.fire(); // ouvre le modal (équivalent à cliquer le bouton)
  }

  onConfirm() {
    const payloadExam: ExamCreateType = {
      studentName: this.form.sutudentName,
      location: this.form.examLocation,
      date: this.form.examDate,
      time: this.form.examTime,
      status: this.form.examStatus,
    };

    this.ex_s.createExam(payloadExam).subscribe({
      next: () => {
        console.log('Examen créé ✅');
        this.organizeSwal.close();
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur création', err);
      },
    });
  }

  resetForm() {
    this.form = {
      sutudentName: '',
      examLocation: '',
      examDate: '',
      examTime: '',
      examStatus: '',
    };
  }

  onDismiss() {
    this.organizeSwal.close();
  }
}
