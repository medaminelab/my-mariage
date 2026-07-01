import { Component, inject } from '@angular/core';

import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-info',
  imports: [ScrollRevealDirective],
  templateUrl: './info.html',
  styleUrl: './info.scss',
})
export class Info {
  protected readonly data = inject(LanguageService).data;
}
