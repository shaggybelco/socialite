import { TestBed } from '@angular/core/testing';

import { SuggestedUsersService } from './suggested-users.service';

describe('SuggestedUsersService', () => {
  let service: SuggestedUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestedUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
