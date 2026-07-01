import { Component, OnDestroy, OnInit, computed, input, signal } from '@angular/core';

import type { WeddingData } from '../../i18n/wedding-data.model';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
})
export class Countdown implements OnInit, OnDestroy {
  readonly targetDateIso = input.required<string>();
  readonly labels = input.required<WeddingData['countdown']>();

  private readonly now = signal(Date.now());
  private intervalId?: ReturnType<typeof setInterval>;

  protected readonly hasArrived = computed(() => this.now() >= Date.parse(this.targetDateIso()));

  protected readonly timeRemaining = computed<TimeRemaining>(() => {
    const diffMs = Math.max(0, Date.parse(this.targetDateIso()) - this.now());
    const totalSeconds = Math.floor(diffMs / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  });

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.now.set(Date.now()), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
