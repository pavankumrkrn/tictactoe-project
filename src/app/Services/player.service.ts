import { Player } from '../Models/Player.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class PlayerService {

 private players : Player [] = [];

 private player : Player = null;

 uploadPlayers(){

 }

 uploadcurrentPlayer(){

 }

 getAllPlayers(): Player []{

    return this.players
 }

 getCurrentPlayer(){

 }

}