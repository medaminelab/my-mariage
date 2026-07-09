import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

const BOTTOM_THRESHOLD_PX = 48;

@Component({
  selector: 'app-scroll-hint',
  imports: [],
  templateUrl: './scroll-hint.html',
  styleUrl: './scroll-hint.scss',
})
export class ScrollHint implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly visible = signal(true);

  private readonly onScroll = (): void => this.updateVisibility();

  ngOnInit(): void {
    this.updateVisibility();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
    });
  }

  private updateVisibility(): void {
    const distanceToBottom =
      document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
    this.visible.set(distanceToBottom > BOTTOM_THRESHOLD_PX);
  }
}
