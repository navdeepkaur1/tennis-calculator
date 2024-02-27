import { TennisMatch } from './tennisMatch';

export class TennisTournament {
  private matches: TennisMatch[];

  constructor(matches: TennisMatch[]) {
    this.matches = matches;
  }

  getGamesSummary = (player: string): string => {
    let gamesWon = 0;
    let gamesLost = 0;

    if (player) {
      for (const match of this.matches) {
        const [won, lost] = match.getGamesForMatch(player);
        gamesWon += won;
        gamesLost += lost;
      }
    } else {
      throw new Error('Please provide query parameter for player name');
    }

    return `${gamesWon} ${gamesLost}`;
  };
}
