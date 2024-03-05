import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponentBackOffice } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponentBackOffice
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponentBackOffice);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'back-office'`, () => {
    const fixture = TestBed.createComponent(AppComponentBackOffice);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('back-office');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponentBackOffice);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('back-office app is running!');
  });
});
