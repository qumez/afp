import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
