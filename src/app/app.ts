import { Component, OnDestroy, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AutoScrollService } from './shared/auto-scroll.service';
import { EnvelopeIntro } from './shared/envelope-intro/envelope-intro';
import { LanguageSwitcher } from './shared/language-switcher/language-switcher';
import { MusicPlayer } from './shared/music-player/music-player';
import { Hero } from './sections/hero/hero';
import { Info } from './sections/info/info';
import { Story } from './sections/story/story';
import { Timeline } from './sections/timeline/timeline';
import { Venue } from './sections/venue/venue';

const SECTION_IDS = ['hero', 'story', 'timeline', 'venue', 'info'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EnvelopeIntro, LanguageSwitcher, MusicPlayer, Hero, Story, Timeline, Venue, Info],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  private readonly autoScroll = inject(AutoScrollService);

  protected readonly introDismissed = signal(false);

  ngOnDestroy(): void {
    this.autoScroll.stop();
  }

  protected onIntroOpened(): void {
    this.introDismissed.set(true);
    setTimeout(() => this.autoScroll.start(SECTION_IDS));
  }
}
