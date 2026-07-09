import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';

import arData from '../i18n/wedding-data.ar.json';
import frData from '../i18n/wedding-data.fr.json';
import type { WeddingData } from '../i18n/wedding-data.model';

export type Lang = 'fr' | 'ar';

const DATA: Record<Lang, WeddingData> = { fr: frData, ar: arData };
const STORAGE_KEY = 'wedding-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly titleService = inject(Title);

  readonly lang = signal<Lang>(this.readStoredLang());
  readonly dir = computed<'ltr' | 'rtl'>(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));
  readonly data = computed<WeddingData>(() => DATA[this.lang()]);

  constructor() {
    effect(() => {
      document.documentElement.lang = this.lang();
      document.documentElement.dir = this.dir();
      this.titleService.setTitle(this.data().pageTitle);
    });
  }

  setLang(lang: Lang): void {
    localStorage.setItem(STORAGE_KEY, lang);
    this.lang.set(lang);
  }

  private readStoredLang(): Lang {
    if (this.queryRequestsArabic()) {
      return 'ar';
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'ar' || stored === 'fr' ? stored : 'fr';
  }

  private queryRequestsArabic(): boolean {
    return new URLSearchParams(window.location.search).get('lang')?.toLowerCase() === 'ar';
  }
}
