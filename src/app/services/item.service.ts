import { Injectable } from '@angular/core';
import { Item } from '../data/models';
import { GameDataService } from './game-data.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private gameData: GameDataService) {}

  getItemById(itemId: number | string): Item {
    return this.gameData.items.value.find((item) => item.id === itemId);
  }
}
