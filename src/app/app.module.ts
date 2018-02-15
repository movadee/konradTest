import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Game
import { GameService } from './game/game.service';
import { GameDataService } from './game/game-data.service';
import { GameListComponent } from './game/game-list/game-list.component';
import { GameDetailsComponent } from './game/game-details/game-details.component';


@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    GameService, 
    GameDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
