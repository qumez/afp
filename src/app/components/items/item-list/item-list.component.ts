import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Item } from 'src/app/data/models';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items: Item[];

  constructor(private gameData: GameDataService) {}

  ngOnInit(): void {
    this.gameData.items.pipe(filter((i) => !!i)).subscribe((items) => {
      this.items = items;
    });
  }
}
