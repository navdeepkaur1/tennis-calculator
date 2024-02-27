import * as fs from 'fs';
import { TennisMatch } from './tennisMatch';

export class ReadAndProcessInput {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  readAndProcessInputFromFile(): TennisMatch[] | undefined {
    if (this.filePath) {
      const inputLines = fs
        .readFileSync(require.resolve(this.filePath), 'utf-8')
        .split('\n')
        .filter((line) => line.trim() !== '');

      let matches: TennisMatch[] = [];
      let matchId = '';
      let player1Name = '';
      let player2Name = '';
      let scoreSequence: number[] = [];
      let currentMatch: TennisMatch | undefined;

      for (const line of inputLines) {
        if (line.startsWith('Match: ')) {
          if (matchId && player1Name && player2Name && scoreSequence.length > 0) {
            currentMatch = new TennisMatch(player1Name, player2Name, matchId, scoreSequence);
            currentMatch.playMatch();
            matches.push(currentMatch);
            scoreSequence = [];
          }
          matchId = this.parseMatch(line);
        } else if (line.startsWith('Person')) {
          const players = line.split(' vs ');
          player1Name = players[0];
          player2Name = players[1];
        } else if (matchId && (line.startsWith('0') || line.startsWith('1'))) {
          const scoreIndex = parseInt(line);
          scoreSequence.push(scoreIndex);
        }
      }

      if (matchId && player1Name && player2Name && scoreSequence.length > 0) {
        currentMatch = new TennisMatch(player1Name, player2Name, matchId, scoreSequence);
        currentMatch.playMatch();
        matches.push(currentMatch);
      }

      return matches;
    } else {
      console.log('Please provide a valid filepath for the tournament');
    }
  }

  private parseMatch(input: string): string {
    const matchNumber = input.split(': ');
    return matchNumber.length === 2 ? matchNumber[1] : '';
  }
}
