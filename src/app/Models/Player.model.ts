

export class Player{
    public playerId: number;
    public playerName: string;
    public passWord: string;
    public playerEmail: string
    constructor(playerId: number, playerName: string, passWord: string, playerEmail: string ){
        this.playerId = playerId;
        this.playerName = playerName;
        this.passWord = passWord;
        this.playerEmail = playerEmail
    }
}