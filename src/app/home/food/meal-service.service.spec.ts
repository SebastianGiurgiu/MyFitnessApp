import { TestBed } from '@angular/core/testing';

import { MealServiceService } from './meal-service.service';

describe('MealServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealServiceService = TestBed.get(MealServiceService);
    expect(service).toBeTruthy();
  });
});
