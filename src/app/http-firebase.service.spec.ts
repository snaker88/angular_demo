import { TestBed } from '@angular/core/testing';

import { HttpFirebaseService } from './http-firebase.service';

describe('HttpFirebaseService', () => {
  let service: HttpFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
