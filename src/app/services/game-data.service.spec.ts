import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GameDataService } from './game-data.service';

describe('GameDataService', () => {
  let service: GameDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(GameDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
