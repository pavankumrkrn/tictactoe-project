import { Component, OnInit } from '@angular/core';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares: string[];
  xisNext: boolean;
  winner: string;
  xwins: number = 0;
  ywins: number = 0;
  drawnGames: number = 0;
  boardStyle: number;
  drawChecker: string[];
  constructor() { }

  ngOnInit(): void {
    this.newGame(3, 'direct');
  }

  getColumns(){
    if(this.boardStyle == 3){
      return "160px 160px 160px"
    } else if(this.boardStyle == 4){
      return "160px 160px 160px 160px"
    } else {
      return "160px 160px 160px 160px 160px"
    }
  }
  getColor(player: number){
    if(this.xwins==this.ywins){
      return 'black'
    } else{
      if(player == 1){
       if (this.xwins>this.ywins){
         return 'green'
       } else {
         return 'red'
       }
     } else{
      if (this.xwins>this.ywins){
        return 'red'
      } else {
        return 'green'
      }
     } 
    }
  }

  newGame(gridSize: number, mode: string) {
    if(mode == 'direct'){
      this.squares = Array(gridSize*gridSize).fill(null);
      this.winner = null;
      this.boardStyle = gridSize;
      this.drawChecker = Array(gridSize*gridSize).fill(null);
    }
    else {
      swal({
        title: "Are you sure want to start a new game with "+gridSize+" X "+gridSize+" board?",
        text: "if you start new game your current progress will be lost!",
        icon: "warning",
        dangerMode: true,
      }).then((result)=>{
        if(result){
          this.newGame(gridSize, 'direct')
        } else {
          swal("Your game is safe");
        }
      });
    }
  }

  startNewGame(){
    swal({
      title: "Are you sure want to start a new game?",
      text: "if you start new game your current progress will be lost!",
      icon: "warning",
      dangerMode: true,
    }).then((result)=>{
      if (result) {
        swal("Please select Game Mode",{
          closeOnClickOutside : false,
          closeOnEsc: false,
          buttons: {           
            three: {
             text: "3 X 3",
             value: 3,
            },
            four : {
              text: "4 X 4",
              value: 4,
            },
            five : {
              text: "5 X 5",
              value: 5,
            }
          }, 
        }).then((val)=>{
          this.newGame(val, 'direct');
        });
      } else {
        swal("Your game is safe!");
      }
    });
  }

  get player(){
    return this.xisNext ? 'X' : 'O';
  }

  makeMove(id: number){
    let drawCount = 0;
    if(!this.squares[id]){
      this.squares.splice(id, 1, this.player);
      this.xisNext = !this.xisNext;
    }
    this.winner = this.calculateWinner(this.boardStyle);
    if(this.winner != null){
      swal("Congratulations!!!!, Player "+this.winner+" has won").then(()=>{
        this.newGame(this.boardStyle, 'direct');
      });
      if(this.winner == 'X'){
        this.xwins++;
      } else {
        this.ywins++;
      }
    }
    for(let i=0; i<this.squares.length; i++){
      if(this.squares[i] != null){
        drawCount++;
      }
    }
    if(drawCount == this.boardStyle * this.boardStyle){
      swal("OOOPs, its a Draw!!!",{
        closeOnClickOutside : false,
        closeOnEsc: false,
      }).then(()=>{
        this.newGame(this.boardStyle, 'direct');
        this.drawnGames++;
      });
    }
  }



  calculateWinner(gridSize: number) {
    if(gridSize == 3){
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          this.squares[a] &&
          this.squares[a] === this.squares[b] &&
          this.squares[a] === this.squares[c]
        ) {
          return this.squares[a];
        }
      }
    } else if (gridSize == 4) {
      const fourByLines = [
        [0, 1, 2, 3],
        [0, 4, 8, 12],
        [0, 5, 10, 15],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [3, 6, 9, 12],
        [4, 5, 6, 7],
        [8, 9, 10 ,11],
        [12, 13, 14, 15]
      ]
      for (let i = 0; i < fourByLines.length; i++) {
        const [a, b, c, d] = fourByLines[i];
        if (
          this.squares[a] &&
          this.squares[a] === this.squares[b] &&
          this.squares[a] === this.squares[c] &&
          this.squares[a] === this.squares[d]
        ) {
          return this.squares[a];
        }
      }
    } else {
      const fiveByLines = [
        [0, 1, 2, 3, 4],
        [0, 5, 10, 15, 20],
        [0, 6, 12, 18, 24],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [4, 8, 12, 16, 20],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24]
      ]
      for (let i = 0; i < fiveByLines.length; i++) {
        const [a, b, c, d, e] = fiveByLines[i];
        if (
          this.squares[a] &&
          this.squares[a] === this.squares[b] &&
          this.squares[a] === this.squares[c] &&
          this.squares[a] === this.squares[d] &&
          this.squares[a] === this.squares[e]
        ) {
          return this.squares[a];
        }
      }
    }
    
    return null;
  }

}
