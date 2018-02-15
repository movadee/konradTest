import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { GameDataService } from '../game-data.service';
import { Game, GameDetail } from '../game';
import * as _ from "lodash";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  gameDetails: GameDetail;
  gameDataDirectory: string;

  constructor(
    private route: ActivatedRoute, 
    private gameService: GameService,
    private gameDataDirectoryService: GameDataService) { }

  ngOnInit() {
    this.gameDetails = new GameDetail;
    this.gameDataDirectoryService.currentDataDirectory.subscribe(res => this.gameDataDirectory = res);
    this.getGameDetails();
  }

  getGameDetails(): void {
    this.gameService.getGame(this.gameDataDirectory)
      .subscribe(game => {this.gameDetails = game},
        err => {
          this.gameDetails  = new GameDetail;
        });
  }

  isEmptyObj(): boolean {
    return _.isEmpty(this.gameDetails);
  }

}
