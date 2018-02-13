import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Game } from './game';

@Injectable()
export class GameService {
  // single object
  // private gamesUrl = 'http://gd2.mlb.com/components/game/mlb/year_2016/month_10/day_04/master_scoreboard.json';
  // array of objects
  private gamesUrl = 'http://gd2.mlb.com/components/game/mlb/year_2018/month_02/day_28/master_scoreboard.json';

  constructor(private http: HttpClient) { }

  /** GET games list from the server */
  getGameList(): Observable<Game[]> {
    return this.http.get(this.gamesUrl)
      .pipe(
        map( result => {
          /** 
            Testing if the "game" object is either an array, if there are multiple games played on a single day,
            or a regular object, if there is only 1 game played on that day. If the game object is a single object,
            it is converted in to an array of objects with a single object inside of the array 
          */
          if(Object.prototype.toString.call(result['data'].games.game) !== "[object Array]"){
            let transformedGamesList: Game[] = [];
            return transformedGamesList.push(result['data'].games.game);
          }
          return result['data'].games.game;
        })
      );
  }

}
