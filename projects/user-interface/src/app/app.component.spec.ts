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

  it(`should have as title 'user-interface'`, () => {
    const fixture = TestBed.createComponent(AppComponentBackOffice);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('user-interface');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponentBackOffice);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('user-interface app is running!');
  });
});
