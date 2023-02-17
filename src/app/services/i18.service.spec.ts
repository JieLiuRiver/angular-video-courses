import { TestBed } from '@angular/core/testing';

import { I18Service } from './i18.service';

describe('I18Service', () => {
  let service: I18Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
