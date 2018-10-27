import { TestBed, inject } from '@angular/core/testing';

import { UnauthorizedInterceptor } from './unauthorized.interceptor';

describe('UnauthorizedInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthorizedInterceptor]
    });
  });

  it('should be created', inject([UnauthorizedInterceptor], (service: UnauthorizedInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
