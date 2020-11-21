import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { GameDataService } from './services/game-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'afp';

  constructor(private gameData: GameDataService) {}
  ngOnInit(): void {
    this.gameData.version
      .pipe(
        filter((v) => !!v),
        switchMap((v) => {
          this.gameData.getItems(v);
          return of();
        }),
        take(1)
      )
      .subscribe();
    this.gameData.getVersion();
  }
}
