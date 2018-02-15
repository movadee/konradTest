// Game object contain a variety of fields. 
// Declared fields bellow are the most relevant.

export class Game {
    game_pk: number;                // game unique id
    game_data_directory: string;    // api route to populate a detail screen for the game
    home_team_name: string;         // name of the home team
    home_name_abbrev: string;       // abbrev name of the home team to display on details window
    away_team_name: string;         // name of the away team
    away_name_abbrev: string;       // abbrev name of the away team to display on details window
    status: any[];                  // status of the game example ("Final", "Postponed", "Cancelled")
    linescore: any[];               // score of the game
}

export interface GameListResponse {
    data: {
      games: {
        game: Game | Game[];
      };
    };
}

export class GameDetail {
  home_sname: string;
  away_fname: string;
  batting: any;
  linescore: any;
}
