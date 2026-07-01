import { Injectable, NgZone, inject } from '@angular/core';

const IDLE_MS = 5000;
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

  private resetIdleTimer(): void {
    clearTimeout(this.idleTimeoutId);
    if (!this.enabled) {
      return;
    }
    this.idleTimeoutId = setTimeout(() => this.advanceToNextSection(), IDLE_MS);
  }

  private advanceToNextSection(): void {
    const nextIndex = this.getCurrentSectionIndex() + 1;
    if (nextIndex < this.sections.length) {
      this.sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.resetIdleTimer();
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
