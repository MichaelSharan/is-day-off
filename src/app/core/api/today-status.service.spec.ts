import { TestBed } from '@angular/core/testing';

import { TodayStatusService } from './today-status.service';
import { TodayStatuses } from './api.model';

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
        console.log(status)
        expect(status).toBe(TodayStatuses.workingDay);
        resolve();
      });
    })
  });

  it('should tell that Sunday in Russia is a day off', () => {
    expect(service.isDayOff(new Date('2023-10-15'), 'ru')).toBe(true);
  });

  it('should tell that 1st of January in Russia is a day off', () => {
    expect(service.isDayOff(new Date('2024-01-01'), 'ru')).toBe(true);
  });

  it('should throw an error if the date is invalid', () => {
    expect(() => service.isDayOff(new Date('invalid-date'), 'ru')).toThrowError('Invalid date');
  });

  it('should throw an error if the country code is invalid', () => {
    expect(() => service.isDayOff(new Date('2023-10-12'), 'invalid-country')).toThrowError('Unsupported country code');
  });
});
