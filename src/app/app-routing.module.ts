import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { GameDetailsComponent } from './game/game-details/game-details.component';

// TODO: add a path redirection in case of an error
const routes: Routes = [
  { path: '', redirectTo: '/game-list', pathMatch: 'full' },
  { path: 'game-list', component: GameListComponent },
  { path: 'game-detail', component: GameDetailsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}