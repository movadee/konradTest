/** 
  Shared Service between components that is keeping a game data directory
  of the selected game in sync between components
*/
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GameDataService {

  gameDataDirectorySource = new BehaviorSubject<string>("");
  currentDataDirectory = this.gameDataDirectorySource.asObservable();
  date = new BehaviorSubject<any>(new Date());
  currentDate = this.date.asObservable();

  updateDataDirectory(dataDirectory: string) {
    this.gameDataDirectorySource.next(dataDirectory);
  }

  updateDate(date: Date) {
    this.date.next(date);
  }

}