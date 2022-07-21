import { TestBed } from '@angular/core/testing';

import { UnfollowService } from './unfollow.service';

describe('UnfollowService', () => {
  let service: UnfollowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnfollowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
