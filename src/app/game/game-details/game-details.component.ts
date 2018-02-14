import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { GameDataDirectoryService } from '../game-data-directory.service';
import { Game } from '../game';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  gameDetail: Game;
  gameDataDirectory: string;

  constructor(
    private route: ActivatedRoute, 
    private gameService: GameService,
    private gameDataDirectoryService: GameDataDirectoryService) { }

  ngOnInit() {
    this.gameDataDirectoryService.currentDataDirectory.subscribe(res => this.gameDataDirectory = res);
    this.getGameDetails();
  }

  getGameDetails(): void {
    this.gameService.getGame(this.gameDataDirectory).subscribe(game => this.gameDetail = game);
  }

}
