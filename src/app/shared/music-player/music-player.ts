import { Component, ElementRef, input, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.html',
  styleUrl: './music-player.scss',
})
export class MusicPlayer {
  readonly visible = input(false);

  protected readonly isPlaying = signal(false);

  private readonly audioRef = viewChild.required<ElementRef<HTMLAudioElement>>('audioEl');

  play(): void {
    this.audioRef().nativeElement
      .play()
      .then(() => this.isPlaying.set(true))
      .catch(() => this.isPlaying.set(false));
  }

  protected toggle(): void {
    const audio = this.audioRef().nativeElement;
    if (audio.paused) {
      audio
        .play()
        .then(() => this.isPlaying.set(true))
        .catch(() => this.isPlaying.set(false));
    } else {
      audio.pause();
      this.isPlaying.set(false);
    }
  }
}
