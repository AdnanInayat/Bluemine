import { TestBed } from '@angular/core/testing';

import { HomepageService } from '../services/homepage.service';

describe('HomepageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomepageService = TestBed.get(HomepageService);
    expect(service).toBeTruthy();
  });
});
