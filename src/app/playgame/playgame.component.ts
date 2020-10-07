import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import * as $ from "jquery";

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.scss']
})
export class PlaygameComponent implements OnInit {

  gameVsComputer: boolean = false;
  newGameForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  getGameMenu(gameType: String){
    if(gameType == 'computer'){
      this.gameVsComputer = true;
      this.newGameForm = new FormGroup({
        'gameMode' : new FormControl("", Validators.required),
        'gameType' : new FormControl("", Validators.required),
        'winningCount' : new FormControl("", [Validators.required, 
          Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(1)]),
        'gamesLimit' : new FormControl("", [Validators.required, 
            Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(1)])
      });
    } else {
      this.gameVsComputer = false;
      this.newGameForm = new FormGroup({
        'gameMode' : new FormControl("", Validators.required),
        'winningCount' : new FormControl("", [Validators.required, 
          Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(1)]),
        'gamesLimit' : new FormControl("", [Validators.required, 
            Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(1)])
      });
    }
  }

  onSubmit(){
    console.log(this.newGameForm);
  }

}
