import { TestBed } from '@angular/core/testing';

import { AuthmainService } from './authmain.service';

describe('AuthmainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthmainService = TestBed.get(AuthmainService);
    expect(service).toBeTruthy();
  });
});
