import { TestBed } from '@angular/core/testing';

import { DailySummaryService } from './daily-summary.service';

describe('DailySummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailySummaryService = TestBed.get(DailySummaryService);
    expect(service).toBeTruthy();
  });
});
