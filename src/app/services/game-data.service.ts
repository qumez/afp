import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item, ItemResponse, ItemResponseItem } from '../data/models';
import {
  ITEMS_ENDPOINT,
  ITEMS_SPRITE_ENDPOINT,
  VERSION_ENDPOINT,
} from '../data/static-endpoints';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  constructor(private http: HttpClient) {}
  version = new BehaviorSubject<string>(null);
  items = new BehaviorSubject<Item[]>(null);

  getVersion(): void {
    if (!this.version.value) {
      this.http
        .get<any>(VERSION_ENDPOINT)
        .subscribe((f) => this.version.next(f[0]));
    }
  }

  getItems(v: string): void {
    this.http
      .get<any>(ITEMS_ENDPOINT.replace('$version', v))
      .subscribe((i: ItemResponse) => {
        this.items.next(this.mapItems(i.data));
      });
  }

  getSprite(
    v: string,
    sprite: 'item0.png' | 'item1.png' | 'item2.png'
  ): Observable<any> {
    return this.http.get<any>(
      ITEMS_SPRITE_ENDPOINT.replace('$version', v).replace('$sprite', sprite)
    );
  }

  mapItems(response: ItemResponseItem): Item[] {
    const items: Item[] = [];
    Object.keys(response).forEach((key) => {
      items.push({ id: key, ...response[key] });
    });
    return items.sort((i, ii) => {
      return i.id - ii.id;
    });
  }
}
