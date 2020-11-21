import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/data/models';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public item: Item,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {}

  getItemSprite() {
    return this.itemService.getItemSprite(this.item);
  }
}
