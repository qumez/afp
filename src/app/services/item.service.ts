import { Injectable } from '@angular/core';
import { Item } from '../data/models';
import { ITEMS_SPRITE_ENDPOINT } from '../data/static-endpoints';
import { GameDataService } from './game-data.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private gameData: GameDataService) {}

  getItemById(itemId: number | string): Item {
    return this.gameData.items.value.find((item) => item.id === itemId);
  }

  getItemSprite(item: Item): Partial<CSSStyleDeclaration> {
    return {
      backgroundImage: `url(${ITEMS_SPRITE_ENDPOINT.replace(
        '$version',
        this.gameData.version.value
      ).replace('$sprite', item.image.sprite)})`,
      backgroundPositionX: -item.image.x.toString() + 'px',
      backgroundPositionY: -item.image.y.toString() + 'px',
    };
  }
}
