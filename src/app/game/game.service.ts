import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Game, GameListResponse, GameDetail } from './game';

@Injectable()
export class GameService {
  
  private scoreboardUrl = 'http://gd2.mlb.com';

  constructor(private http: HttpClient) { }

  /** GET games list from the server */
  getGameList(apiFeed: string): Observable<Game[]> {
    return this.http.get<GameListResponse>(apiFeed)
      .pipe(
        map(res => res['data'].games.game),
        map(
          games => (games === undefined) ? [] : Array.isArray(games) ? games : [games]
        )
      );
  }

  /** GET game from game_data_directory */
  getGame(gameDataDirectory: string): Observable<GameDetail> {
    const url = `${this.scoreboardUrl}${gameDataDirectory}/boxscore.json`;
    return this.http.get<GameDetail>(url)
      .pipe(
        map(res => res['data'].boxscore)
      );
  }

}
