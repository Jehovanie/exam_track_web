import { Component } from '@angular/core';
import { LucideAngularModule, LoaderCircle } from 'lucide-angular';

@Component({
  selector: 'app-loading',
  imports: [LucideAngularModule],
  template: `
    <button type="button" class="" disabled>
      <lucide-angular [img]="Loader" class="mr-3 size-5 animate-spin text-orange-600"></lucide-angular>
    </button>
  `,
  styles: ``,
})
export class LoadingComponent {
  readonly Loader = LoaderCircle;
}
