import { HttpClient } from '@angular/common/http';
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

  constructor(private gameData: GameDataService, private http: HttpClient) {}
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

  callAuthTest() {
    this.http
      .get('http://localhost:5001/quick-builds/us-central1/authTest')
      .subscribe((e) => alert(e));
  }
  callHelloWorld() {
    this.http
      .get('http://localhost:5001/quick-builds/us-central1/helloWorld')
      .subscribe((e) => alert(e));
  }
  call403() {
    this.http
      .get('http://localhost:5001/quick-builds/us-central1/force403')
      .subscribe((e) => alert(e));
  }
}
