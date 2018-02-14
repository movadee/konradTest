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
  favouriteTeam: string;
  date;
  selectedDate;

  constructor(
    private gameService: GameService,
    private gameDataDirectoryService: GameDataDirectoryService) {
    this.gameList = [];
    this.favouriteTeam = 'Blue Jays';
   }

  ngOnInit() {
    // date setup
    this.date = new Date();
    this.selectedDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    
    this.gameDataDirectoryService.currentDataDirectory.subscribe(res => this.gameDataDirectory = res);
    this.getGameList();
    this.showFavTeamFirst(this.favouriteTeam);
  }

  getGameList(): void {
    this.gameService.getGameList().subscribe(games => this.gameList = games);
  }

  updateGameDataDirectory(gameDataDirectory: string): void {
    this.gameDataDirectoryService.updateDataDirectory(gameDataDirectory);
  }

  showFavTeamFirst(favTeam: string) {
    if (this.gameList.length === 1) return;

    this.gameList.forEach((game, index) => {
      (game.home_team_name === favTeam || game.away_team_name === favTeam) 
      ? this.gameList.splice(index, 1, this.gameList.splice(1, 1, this.gameList[index])[0]) : '';
    });
  }

  nextDay() {
    this.date.setDate(this.date.getDate() + 1);
    this.selectedDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
  } 
  
  previousDay() {
    this.date.setDate(this.date.getDate() - 1);
    this.selectedDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
  }
}
