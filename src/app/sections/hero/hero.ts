import { Component, inject } from '@angular/core';

import { LanguageService } from '../../shared/language.service';
import { Countdown } from '../countdown/countdown';

@Component({
  selector: 'app-hero',
  imports: [Countdown],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly data = inject(LanguageService).data;
}
