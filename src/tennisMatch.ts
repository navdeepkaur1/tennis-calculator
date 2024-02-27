import { TennisGame } from './tennisGame';
import { TennisSet } from './tennisSet';

export class TennisMatch {
  private sets: TennisSet[];
  private player1Name: string;
  private player2Name: string;
  private matchId: string;
  private scoreSequence: number[];
  private setsPlayer1Won: number;
  private setsPlayer2Won: number;

  constructor(player1Name: string, player2Name: string, matchId: string, scoreSequence: number[] = []) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.matchId = matchId;
    this.scoreSequence = scoreSequence;
    this.sets = [];
    this.setsPlayer1Won = 0;
    this.setsPlayer2Won = 0;
  }

  playMatch = (): void => {
    let game = new TennisGame(this.player1Name, this.player2Name);
    let set = new TennisSet(this.player1Name, this.player2Name);
    for (const score of this.scoreSequence) {
      game.scoreWonBy(score);
      const setResult = set.playGame(game);
      if (setResult === 'player1' || setResult === 'player2') {
        if (setResult === 'player1') {
          this.setsPlayer1Won++;
        } else {
          this.setsPlayer2Won++;
        }
        this.sets.push(set);
        game = new TennisGame(this.player1Name, this.player2Name); //reset game for next set
        set = new TennisSet(this.player1Name, this.player2Name); //reset set for next set
      }
    }
  };

  getMatchResult = (): string => {
    if (this.setsPlayer1Won === 2 && this.setsPlayer2Won < 2) {
      return this.getMatchSummary(this.player1Name, this.player2Name, this.setsPlayer1Won, this.setsPlayer2Won);
    } else if (this.setsPlayer2Won === 2 && this.setsPlayer1Won < 2) {
      return this.getMatchSummary(this.player2Name, this.player1Name, this.setsPlayer2Won, this.setsPlayer1Won);
    }
    return 'Match in progress';
  };

  getGamesForMatch = (player: string): [number, number] => {
    let gamesWon = 0;
    let gamesLost = 0;
    if (this.player1Name === player || this.player2Name === player) {
      for (const set of this.sets) {
        const [won, lost] = set.getGamesForSet(player);
        gamesWon += won;
        gamesLost += lost;
      }
    }
    return [gamesWon, gamesLost];
  };

  getMatchId = (): string => {
    return this.matchId;
  };

  private getMatchSummary = (
    playerWonName: string,
    playerLostName: string,
    setsWon: number,
    setsLost: number,
  ): string => {
    return `Match ${this.matchId} \n ${playerWonName} defeated ${playerLostName} \n ${setsWon} sets to ${setsLost}`;
  };
}
