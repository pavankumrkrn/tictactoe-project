import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { PlayerService } from '../Services/player.service';
import { Player } from '../Models/Player.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {


  isSignUp: boolean = false;
  loginForm : FormGroup;
  player: Player;

  constructor(private apiService : ApiService,
              private playerService: PlayerService,
              private router : Router) { }

  ngOnInit(): void {
    this.playerService.uploadPlayers();
    this.loginFormInit();
    
  }

  loginFormInit(){
    this.loginForm = new FormGroup({
      'username' : new FormControl('', Validators.required),
      'password' : new FormControl('', Validators.required)
    })
  }


  loginUser(){
    if(this.isSignUp){
      this.player = new Player(null, 
      this.loginForm.value.username, 
      this.loginForm.value.password, 
      this.loginForm.value.email);
      console.log(this.player);
      this.apiService.postPlayer(this.player);
    } else {
      this.player = new Player(null,this.loginForm.value.username, this.loginForm.value.password, null);
      this.apiService.getPlayer(this.player);
    }

  }

  signUpInit(){
    this.isSignUp = !this.isSignUp;
    const players: Player[] = this.playerService.getAllPlayers();

    if(this.isSignUp){
      this.apiService.getPlayers();
      this.loginForm = new FormGroup({
        'username' : new FormControl('', Validators.required),
        'password' : new FormControl('', Validators.required),
        'email' : new FormControl('', Validators.required)
      });
    } else {
      this.loginFormInit();
    }
    
  }



}
