import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { GameDataService } from '../game-data.service';
import { Game } from '../game';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  gameList: Game[];
  gameDataDirectory: string;
  favouriteTeam: string;
  teams: any[];
  currentDate;

  constructor(
    private gameService: GameService,
    private gameDataDirectoryService: GameDataService) { }

  ngOnInit() {
    this.gameDataDirectoryService.currentDataDirectory.subscribe(res => this.gameDataDirectory = res);
    this.gameDataDirectoryService.currentDate.subscribe(res => this.currentDate = res);
    this.teams = ['Blue Jays', 'Red Sox','Tigers', 'Twins'];
    this.gameList = [];
    this.getGameList();
  }

  getGameList(): void {
    let year = this.currentDate.getFullYear();
    let month = this.currentDate.getMonth() + 1;
    let day = this.currentDate.getDate();

    let apiFeed = 'http://gd2.mlb.com/components/game/mlb/year_' + year 
                  + '/month_'+ (month < 10 ? '0' + month : month) 
                  + '/day_' + (day < 10 ? '0' + day : day) + '/master_scoreboard.json';
    this.gameService.getGameList(apiFeed)
      .subscribe( data => {
        this.gameList = data;
        this.showFavTeamFirst(this.favouriteTeam);
      },
      err => {
        this.gameList = [];
      });
  }

  updateGameDataDirectory(gameDataDirectory: string): void {
    this.gameDataDirectoryService.updateDataDirectory(gameDataDirectory);
  }

  updateDate(date): void {
    this.gameDataDirectoryService.updateDate(date);
  }

  // Re-order the list of games when a different team becomes favourite
  showFavTeamFirst(favTeam: string = 'Blue Jays') {
    this.favouriteTeam = favTeam;
    for (var i=this.gameList.length-1; i>0; i--) {
      if (this.gameList[i].home_team_name === favTeam || this.gameList[i].away_team_name === favTeam) {
          var obj = this.gameList[i];
          this.gameList.splice(i, 1);
          this.gameList.unshift(obj);   
      }
    }
  }

  // TODO: optimize date manipulation functions, can be written in more elegant way
  changeDay(prevOrNext: string) {
    let DATE = new Date(this.currentDate);
    (prevOrNext === 'next') ? DATE.setDate(this.currentDate.getDate() + 1) : DATE.setDate(this.currentDate.getDate() - 1);
    this.updateDate(DATE)
    this.getGameList();
  }

  dateChange(event: MatDatepickerInputEvent<Date>){
    this.updateDate(event.value);
    this.getGameList();
  }

}
