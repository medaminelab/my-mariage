import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { App } from './app';
import { EnvelopeIntro } from './shared/envelope-intro/envelope-intro';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show a closed envelope before the couple names are revealed', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.envelope')).toBeTruthy();
    expect(compiled.querySelector('h1')).toBeNull();
  });

  it('should render the couple names once the envelope has been opened', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const envelope = fixture.debugElement.query(By.directive(EnvelopeIntro)).componentInstance as EnvelopeIntro;
    envelope.opened.emit();
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Mohamed Amine');
  });
});
