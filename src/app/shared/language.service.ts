import { Injectable, computed, effect, signal } from '@angular/core';

import arData from '../i18n/wedding-data.ar.json';
import frData from '../i18n/wedding-data.fr.json';
import type { WeddingData } from '../i18n/wedding-data.model';

export type Lang = 'fr' | 'ar';

const DATA: Record<Lang, WeddingData> = { fr: frData, ar: arData };
const STORAGE_KEY = 'wedding-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>(this.readStoredLang());
  readonly dir = computed<'ltr' | 'rtl'>(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));
  readonly data = computed<WeddingData>(() => DATA[this.lang()]);

  constructor() {
    effect(() => {
      document.documentElement.lang = this.lang();
      document.documentElement.dir = this.dir();
    });
  }

  setLang(lang: Lang): void {
    localStorage.setItem(STORAGE_KEY, lang);
    this.lang.set(lang);
  }

  private readStoredLang(): Lang {
    return localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'fr';
  }
}
