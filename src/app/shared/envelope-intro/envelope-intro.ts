import { Component, OnDestroy, OnInit, inject, output, signal } from '@angular/core';

import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { LanguageService } from '../language.service';

type EnvelopePhase = 'closed' | 'opening' | 'leaving';

const OPEN_ANIMATION_MS = 1700;
const LEAVE_ANIMATION_MS = 900;

@Component({
  selector: 'app-envelope-intro',
  imports: [LanguageSwitcher],
  templateUrl: './envelope-intro.html',
  styleUrl: './envelope-intro.scss',
})
export class EnvelopeIntro implements OnInit, OnDestroy {
  protected readonly data = inject(LanguageService).data;
  protected readonly phase = signal<EnvelopePhase>('closed');

  readonly opened = output<void>();
  readonly openStarted = output<void>();

  private leaveTimeoutId?: ReturnType<typeof setTimeout>;
  private closeTimeoutId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    clearTimeout(this.leaveTimeoutId);
    clearTimeout(this.closeTimeoutId);
  }

  protected open(): void {
    if (this.phase() !== 'closed') {
      return;
    }
    this.openStarted.emit();
    this.phase.set('opening');
    this.leaveTimeoutId = setTimeout(() => this.phase.set('leaving'), OPEN_ANIMATION_MS);
    this.closeTimeoutId = setTimeout(() => this.opened.emit(), OPEN_ANIMATION_MS + LEAVE_ANIMATION_MS);
  }
}
