import { Component, inject } from '@angular/core';

import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-story',
  imports: [ScrollRevealDirective],
  templateUrl: './story.html',
  styleUrl: './story.scss',
})
export class Story {
  protected readonly data = inject(LanguageService).data;
}
