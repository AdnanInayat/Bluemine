import { TestBed } from '@angular/core/testing';
import { NewticketService } from './newticket.service';

describe('NewticketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewticketService = TestBed.get(NewticketService);
    expect(service).toBeTruthy();
  });
});
