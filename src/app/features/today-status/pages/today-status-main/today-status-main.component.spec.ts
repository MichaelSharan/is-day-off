import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayStatusMainComponent } from './today-status-main.component';

describe('TodayStatusMainComponent', () => {
  let component: TodayStatusMainComponent;
  let fixture: ComponentFixture<TodayStatusMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayStatusMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayStatusMainComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('Сегодня выходной?');
  });

  it('should render the date', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dateElement = compiled.querySelector('.date');
    expect(dateElement).toBeTruthy();
    const today = new Date();
    const expectedDateString = `${today.getDate()} ${today.toLocaleString('ru', { month: 'long' })}`;
    expect(dateElement?.textContent).toContain(expectedDateString);
  });

  it('should render the status', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const statusElement = compiled.querySelector('.status');
    expect(statusElement).toBeTruthy();
    expect(statusElement?.textContent).toMatch(/Сегодня (выходной|рабочий день)/);
  });
});
