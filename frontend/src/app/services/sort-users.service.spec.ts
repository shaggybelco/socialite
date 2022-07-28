import { TestBed } from '@angular/core/testing';

import { SortUsersService } from './sort-users.service';

describe('SortUsersService', () => {
  let service: SortUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
