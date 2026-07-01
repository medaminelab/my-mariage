import { Component, inject } from '@angular/core';

import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-timeline',
  imports: [ScrollRevealDirective],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline {
  protected readonly data = inject(LanguageService).data;
}
