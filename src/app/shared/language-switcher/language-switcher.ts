import { Component, inject } from '@angular/core';

import { Lang, LanguageService } from '../language.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  protected readonly languageService = inject(LanguageService);

  protected setLang(lang: Lang): void {
    this.languageService.setLang(lang);
  }
}
