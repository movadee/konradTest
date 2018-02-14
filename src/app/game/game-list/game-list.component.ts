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
  gameList: Game[] = [];
  gameDataDirectory: string;
  favouriteTeam: string;

  // date;
  selectedDate;
  displayDate;
  // year;
  // month;
  // day;

  constructor(
    private gameService: GameService,
    private gameDataDirectoryService: GameDataDirectoryService) {
    this.gameList;
    this.favouriteTeam = 'Blue Jays';

    this.selectedDate = new Date();
    // this.displayDate = 
    // this.date = new Date();
    // this.year = this.date.getFullYear();
    // this.month = this.date.getMonth() + 1;
    // this.day = this.date.getDate();
    // this.selectedDate = new Date(this.year, this.month-1, this.day);
    // this.selectedDate = new Date("2018, 2, 2");
   }

  ngOnInit() {
    this.gameDataDirectoryService.currentDataDirectory.subscribe(res => this.gameDataDirectory = res);
    this.getGameList();
    this.showFavTeamFirst(this.favouriteTeam);
  }

  getGameList(): void {
    let year = this.selectedDate.getFullYear();
    let month = this.selectedDate.getMonth() + 1;
    let day = this.selectedDate.getDate();

    let apiFeed = 'http://gd2.mlb.com/components/game/mlb/year_' + year 
                  + '/month_'+ (month < 10 ? '0' + month : month) 
                  + '/day_' + (day < 10 ? '0' + day : day) + '/master_scoreboard.json';
    this.gameService.getGameList(apiFeed).subscribe(games => this.gameList = games);
    console.log(this.gameList);
  }

  updateGameDataDirectory(gameDataDirectory: string): void {
    this.gameDataDirectoryService.updateDataDirectory(gameDataDirectory);
  }

  showFavTeamFirst(favTeam: string) {
    if (this.gameList.length === 1) return;

    this.gameList.forEach((game, index) => {
      // (game.home_team_name === favTeam || game.away_team_name === favTeam) 
      // ? this.gameList.splice(index, 1, this.gameList.splice(1, 1, this.gameList[index])[0]) : '';
    });
  }

  changeDay(prevOrNext: string) {
    // (prevOrNext === 'next') ? this.date.setDate(this.date.getDate() + 1) : this.date.setDate(this.date.getDate() - 1);
    (prevOrNext === 'next') ? this.selectedDate.setDate(this.selectedDate.getDate() + 1) : this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    // this.year = this.date.getFullYear();
    // this.month = this.date.getMonth();
    // this.day = this.date.getDate();

    // this.selectedDate = new Date(this.year, this.month-1, this.day);
    // this.getGameList(this.year, this.month, this.day);
    this.getGameList();
  }

}
