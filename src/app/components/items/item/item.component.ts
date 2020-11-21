import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  DialogPosition,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { fromEvent, merge, Subscription } from 'rxjs';
import { delay, repeat, takeUntil, takeWhile } from 'rxjs/operators';
import { Item } from 'src/app/data/models';
import { ITEMS_SPRITE_ENDPOINT } from 'src/app/data/static-endpoints';
import { GameDataService } from 'src/app/services/game-data.service';
import { ItemService } from 'src/app/services/item.service';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements AfterViewInit, OnDestroy {
  @ViewChild('iconRef') iconRef: ElementRef;
  @Input() item: Item;
  get sprite(): string {
    return ITEMS_SPRITE_ENDPOINT.replace(
      '$version',
      this.gameData.version.value
    ).replace('$sprite', this.item?.image?.sprite);
  }

  private sub: Subscription = new Subscription();
  private dialogRef: MatDialogRef<ItemDetailsComponent>;
  constructor(
    private gameData: GameDataService,
    private itemService: ItemService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.sub.add(
      fromEvent(this.iconRef.nativeElement, 'mouseenter')
        .pipe(
          takeWhile(() => !this.dialogRef),
          delay(100),
          takeUntil(fromEvent(this.iconRef.nativeElement, 'mouseleave')),
          repeat()
        )
        .subscribe(() => {
          this.openDialog();
        })
    );
  }

  openDialog(): void {
    const position: DialogPosition = {
      left: this.iconRef.nativeElement.getBoundingClientRect().left + 48 + 'px',
      top: this.iconRef.nativeElement.getBoundingClientRect().top + 'px',
    };

    this.dialogRef = this.dialog.open(ItemDetailsComponent, {
      data: this.item,
      hasBackdrop: false,
      position,
      width: '600px',
    });

    const mdc = document.querySelector('mat-dialog-container');
    const sub = new Subscription();

    this.dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });

    sub.add(
      merge(
        fromEvent(this.iconRef.nativeElement, 'mouseleave').pipe(
          delay(100),
          takeUntil(
            merge(
              fromEvent(this.iconRef.nativeElement, 'mouseenter'),
              fromEvent(mdc, 'mouseenter')
            )
          ),
          repeat()
        ),
        fromEvent(mdc, 'mouseleave')
          .pipe(
            delay(100),
            takeUntil(
              merge(
                fromEvent(mdc, 'mouseenter'),
                fromEvent(this.iconRef.nativeElement, 'mouseenter')
              )
            ),
            repeat()
          )
          .pipe(takeUntil(this.dialogRef.afterClosed()))
      ).subscribe(() => {
        this.dialogRef.close();
        this.dialogRef = undefined;
      })
    );
  }

  getItemSprite(): Partial<CSSStyleDeclaration> {
    return this.itemService.getItemSprite(this.item);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
