import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { Game } from '../game';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  gameDetail: Game;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit() {
    this.getGameDetails();
  }

  getGameDetails(): void {
    console.log(+this.route.snapshot.paramMap.get('id'));
    // const gameDataDirectory = +this.route.snapshot.paramMap.get('id');
    // this.gameService.getGame(gameDataDirectory).subscribe(game => this.gameDetail = game);
  }

}
