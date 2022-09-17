import { TestBed } from '@angular/core/testing';

import { ImageSendService } from './image-send.service';

describe('ImageSendService', () => {
  let service: ImageSendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
