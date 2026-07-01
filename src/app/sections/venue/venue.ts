import { Component, computed, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { LanguageService } from '../../shared/language.service';

@Component({
  selector: 'app-venue',
  imports: [ScrollRevealDirective],
  templateUrl: './venue.html',
  styleUrl: './venue.scss',
})
export class Venue {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly data = inject(LanguageService).data;
  protected readonly mapEmbedUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.data().venue.mapEmbedUrl),
  );
}
