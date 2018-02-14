import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Game, GameListResponse } from './game';

@Injectable()
export class GameService {
  
  private scoreboardUrl = 'http://gd2.mlb.com';
  private gamesListDirectory = '/components/game/mlb/year_2018/month_02/day_28/master_scoreboard.json';

  constructor(private http: HttpClient) { }

  /** GET games list from the server */
  getGameList(): Observable<Game[]> {
    const url = `${this.scoreboardUrl}${this.gamesListDirectory}`;
    return this.http.get<GameListResponse>(url)
      .pipe(
        map(res => res['data'].games.game),
        map(games => Array.isArray(games) ? games : [games])
      );
  }

  /** GET game from game_data_directory. */
  getGame(gameDataDirectory: string): Observable<Game> {
    const url = `${this.scoreboardUrl}${gameDataDirectory}/boxscore.json`;
    return this.http.get<Game>(url);
  }

}
