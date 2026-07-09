import { Injectable, NgZone, inject } from '@angular/core';

const IDLE_MS = 15000;
const SECTION_IDLE_OVERRIDES_MS: Record<string, number> = {
  story: 30000,
};
const ACTIVITY_EVENTS = ['wheel', 'touchstart', 'touchmove', 'keydown', 'pointerdown'] as const;

@Injectable({ providedIn: 'root' })
export class AutoScrollService {
  private readonly ngZone = inject(NgZone);

  private sections: HTMLElement[] = [];
  private enabled = false;
  private idleTimeoutId?: ReturnType<typeof setTimeout>;

  private readonly onUserActivity = (): void => this.resetIdleTimer();

  start(sectionIds: string[]): void {
    this.sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (this.sections.length === 0 || this.enabled) {
      return;
    }

    this.enabled = true;
    this.ngZone.runOutsideAngular(() => {
      for (const eventName of ACTIVITY_EVENTS) {
        window.addEventListener(eventName, this.onUserActivity, { passive: true });
      }
      this.resetIdleTimer();
    });
  }

  stop(): void {
    this.enabled = false;
    clearTimeout(this.idleTimeoutId);
    for (const eventName of ACTIVITY_EVENTS) {
      window.removeEventListener(eventName, this.onUserActivity);
    }
  }

  private resetIdleTimer(sectionId?: string): void {
    clearTimeout(this.idleTimeoutId);
    if (!this.enabled) {
      return;
    }
    const currentSectionId = sectionId ?? this.sections[this.getCurrentSectionIndex()]?.id;
    const delay = SECTION_IDLE_OVERRIDES_MS[currentSectionId ?? ''] ?? IDLE_MS;
    this.idleTimeoutId = setTimeout(() => this.advanceToNextSection(), delay);
  }

  scrollToNextSection(): HTMLElement | undefined {
    const nextSection = this.sections[this.getCurrentSectionIndex() + 1];
    nextSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return nextSection;
  }

  private advanceToNextSection(): void {
    const nextSection = this.scrollToNextSection();
    this.resetIdleTimer(nextSection?.id);
  }

  private getCurrentSectionIndex(): number {
    const scrollMarker = window.scrollY + window.innerHeight / 3;
    let index = 0;
    this.sections.forEach((section, i) => {
      if (section.offsetTop <= scrollMarker) {
        index = i;
      }
    });
    return index;
  }
}
