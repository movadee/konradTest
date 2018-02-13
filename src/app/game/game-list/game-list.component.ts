import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GameService } from '../game.service';
import { Game } from '../game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  gameList: Game[];
  date = new FormControl(new Date());

  constructor(private gameService: GameService) {
    this.gameList = [];
   }

  ngOnInit() {
    this.getGameList();
  }

  getGameList(): void {
    this.gameService.getGameList().subscribe(games => this.gameList = games);
  }
}
