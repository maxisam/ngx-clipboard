/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClipboardService } from './clipboard.service';

describe('Service: Clipboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClipboardService]
    });
  });

  it('should ...', inject([ClipboardService], (service: ClipboardService) => {
    expect(service).toBeTruthy();
  }));
});
