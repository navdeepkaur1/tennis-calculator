export class TennisGame {
  private player1Score: number;
  private player2Score: number;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.player1Score = 0;
    this.player2Score = 0;
  }

  scoreWonBy = (scoreIndex: number): void => {
    if (scoreIndex === 0) {
      this.player1Score++;
    } else if (scoreIndex === 1) {
      this.player2Score++;
    } else {
      throw new Error('Invalid score index');
    }
  };

  score = (): string => {
    if (this.isAll(this.player1Score, this.player2Score)) {
      return `${this.getScoreSynonym(this.player1Score)}-All`;
    } else if (this.isDeuce(this.player1Score, this.player2Score)) {
      return 'Deuce';
    } else if (this.advantagePlayerOne(this.player1Score, this.player2Score)) {
      return `Advantage ${this.player1Name}`;
    } else if (this.advantagePlayerTwo(this.player1Score, this.player2Score)) {
      return `Advantage ${this.player2Name}`;
    } else if (this.playerOneWon(this.player1Score, this.player2Score)) {
      this.resetScores();
      return this.player1Name;
    } else if (this.playerTwoWon(this.player1Score, this.player2Score)) {
      this.resetScores();
      return this.player2Name;
    }
    return `${this.getScoreSynonym(this.player1Score)}-${this.getScoreSynonym(this.player2Score)}`;
  };

  private resetScores(): void {
    this.player1Score = 0;
    this.player2Score = 0;
  }

  private scoreSynonyms = ['Love', 'Fifteen', 'Thirty', 'Forty'];

  private getScoreSynonym = (score: number) => this.scoreSynonyms[score];

  private scoresAreEqual = (player1Scores: number, player2Scores: number) => player1Scores === player2Scores;

  private isAll = (player1Scores: number, player2Scores: number) => {
    return this.scoresAreEqual(player1Scores, player2Scores) && player1Scores < 3;
  };

  private isDeuce = (player1Scores: number, player2Scores: number) => {
    return this.scoresAreEqual(player1Scores, player2Scores) && player1Scores >= 3 && player2Scores >= 3;
  };

  private advantagePlayerOne = (player1Scores: number, player2Scores: number): boolean => {
    return player1Scores >= 4 && player1Scores - player2Scores === 1;
  };

  private advantagePlayerTwo = (player1Scores: number, player2Scores: number): boolean => {
    return player2Scores >= 4 && player2Scores - player1Scores === 1;
  };

  private playerOneWon = (player1Scores: number, player2Scores: number): boolean => {
    return player1Scores >= 4 && player1Scores - player2Scores >= 2;
  };

  private playerTwoWon = (player1Scores: number, player2Scores: number): boolean => {
    return player2Scores >= 4 && player2Scores - player1Scores >= 2;
  };
}
