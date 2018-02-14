import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Game, GameListResponse } from './game';

@Injectable()
export class GameService {
  
  private scoreboardUrl = 'http://gd2.mlb.com';
  private gamesListDirectory = '/components/game/mlb/year_2018/month_02/day_28/master_scoreboard.json';
  private handleError: any;

  constructor(private http: HttpClient) { }

  /** GET games list from the server */
  getGameList(apiFeed: string): Observable<Game[]> {
    return this.http.get<GameListResponse>(apiFeed)
      .pipe(
        map(res => res['data'].games.game),
        map(games => Array.isArray(games) ? games : [games])
      );
  }

  /** GET game from game_data_directory */
  getGame(gameDataDirectory: string): Observable<Game> {
    const url = `${this.scoreboardUrl}${gameDataDirectory}/boxscore.json`;
    return this.http.get<Game>(url);
  }

}
