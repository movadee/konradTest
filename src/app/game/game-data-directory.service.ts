import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/** 
  Shared Service between components that is keeping a game data directory
  of the selected game in sync between components
*/
@Injectable()
export class GameDataDirectoryService {

  private gameDataDirectorySource = new BehaviorSubject<string>("");
  currentDataDirectory = this.gameDataDirectorySource.asObservable();

  constructor() { }

  updateDataDirectory(dataDirectory: string) {
    this.gameDataDirectorySource.next(dataDirectory);
  }

}