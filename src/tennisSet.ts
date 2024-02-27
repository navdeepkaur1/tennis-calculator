import { TennisGame } from './tennisGame';

export class TennisSet {
  private gamePlayers: string[]; //winning player for each game
  private player1Name: string;
  private player2Name: string;
  private player1GamesWon: number;
  private player2GamesWon: number;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.gamePlayers = [];
    this.player1GamesWon = 0;
    this.player2GamesWon = 0;
  }

  playGame = (game: TennisGame): string => {
    const gameResult = game.score();
    if (gameResult === this.player1Name || gameResult === this.player2Name) {
      if (gameResult === this.player1Name) {
        this.player1GamesWon++;
        this.gamePlayers.push(this.player1Name);
      } else {
        this.player2GamesWon++;
        this.gamePlayers.push(this.player2Name);
      }
      return this.getSetResult();
    }
    return gameResult;
  };

  getGamesForSet = (player: string): [number, number] => {
    let gamesWon = 0;
    let gamesLost = 0;
    for (const gamePlayer of this.gamePlayers) {
      if (gamePlayer === player) {
        gamesWon++;
      } else {
        gamesLost++;
      }
    }
    return [gamesWon, gamesLost];
  };

  private getSetResult = (): string => {
    if (this.player1GamesWon === 6) {
      this.resetGames();
      return 'player1';
    } else if (this.player2GamesWon === 6) {
      this.resetGames();
      return 'player2';
    }
    return 'Set in progress';
  };

  private resetGames = (): void => {
    this.player1GamesWon = 0;
    this.player2GamesWon = 0;
  };
}
