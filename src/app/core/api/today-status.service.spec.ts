import { TestBed } from '@angular/core/testing';

import { TodayStatusService } from './today-status.service';

describe('TodayStatusService', () => {
  let service: TodayStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodayStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should tell that Wednesday in Russia is not a day off', () => {
    return new Promise<void>(resolve => {
      service.isDayOff(new Date('2023-10-11'), 'ru').subscribe(status => {
        expect(status).toBe(false);
        resolve();
      });
    })
  });

  it('should tell that Sunday in Russia is a day off', () => {
    return new Promise<void>(resolve => {
      service.isDayOff(new Date('2023-10-15'), 'ru').subscribe(status => {
        expect(status).toBe(true);
        resolve();
      });
    })
  });

  it('should tell that 1st of January in Russia is a day off', () => {
    return new Promise<void>(resolve => {
      service.isDayOff(new Date('2024-01-01'), 'ru').subscribe(status => {
        console.log(status)
        expect(status).toBe(true);
        resolve();
      });
    })
  });

  it('should throw an error if the date is invalid', () => {
    return new Promise<void>(resolve => {
      service.isDayOff(new Date('invalid-date'), 'ru').subscribe({
        error: err => {
          expect(err.message).toBe('Invalid date');
          resolve();
        },
        next: () => {
          expect.fail('Expected an error to be thrown for invalid date');
        }
      });
    });
  });

  it('should throw an error if the country code is invalid', () => {
    return new Promise<void>(resolve => {
      service.isDayOff(new Date('2023-10-12'), 'invalid-country').subscribe({
        error: err => {
          expect(err.message).toBe('Unsupported country code');
          resolve();
        },
        next: () => {
          expect.fail('Expected an error to be thrown for invalid country code');
        }
      });
    });
  });
});
