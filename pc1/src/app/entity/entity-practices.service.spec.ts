import { TestBed } from '@angular/core/testing';

import { EntityPracticesService } from './entity-practices.service';

describe('EntityPracticesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntityPracticesService = TestBed.get(EntityPracticesService);
    expect(service).toBeTruthy();
  });
});
