import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from '../Models/Player.model';
@Injectable({
    providedIn: 'root'
  })
export class ApiService{

    constructor(private http : HttpClient){}

    getPlayer(player: Player){
      return this.http.get<Player>('/api/player/login');

    }

    postPlayer(player: Player){
      return this.http.post('/api/player/signUp',player);
    }

    putPlayer(){

    }

    getPlayers(){
      console.log("Getting Players");
      return this.http.get('/api/player/getAllPlayers');
    }


}