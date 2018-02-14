import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { GameDataDirectoryService } from '../game-data-directory.service';
import { Game } from '../game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  gameList: Game[];
  gameDataDirectory: string;
  date;

  constructor(
    private gameService: GameService,
    private gameDataDirectoryService: GameDataDirectoryService) {
    this.gameList = [];
   }

  ngOnInit() {
    this.date = new Date();
    this.gameDataDirectoryService.currentDataDirectory.subscribe(res => this.gameDataDirectory = res);
    this.getGameList();
  }

  getGameList(): void {
    this.gameService.getGameList().subscribe(games => this.gameList = games);
  }

  updateGameDataDirectory(gameDataDirectory: string): void {
    this.gameDataDirectoryService.updateDataDirectory(gameDataDirectory);
  }
}
