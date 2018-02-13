// Game object contain a variety of fields. 
// Declared fields bellow are the most relevant.

export interface Game {
    game_pk: string;                // game unique id
    game_data_directory: string;    // api route to populate a detail screen for the game
    home_team_name: string;         // name of the home team
    away_team_name: string;         // name of the away team
    status: any[];                  // status of the game example ("Final", "Postponed", "Cancelled")
    linescore: any[];               // score of the game
}
