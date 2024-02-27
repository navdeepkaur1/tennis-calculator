import { TennisMatch } from '../src/tennisMatch';
import { TennisTournament } from '../src/tournament';
import testData from './testData/scores.json';

describe('TennisTournament', () => {
  let tournament: TennisTournament;

  beforeEach(() => {
    tournament = new TennisTournament([]);
  });

  it('should return correct game summary for a player when matches are present', () => {
    const match1 = new TennisMatch('Player 1', 'Player 2', '1', testData[0].scoreSequence);
    const match2 = new TennisMatch('Player 1', 'Player 2', '2', testData[1].scoreSequence);
    match1.playMatch();
    match2.playMatch();
    tournament = new TennisTournament([match1, match2]);
    expect(tournament.getGamesSummary('Player 1')).toBe('12 12');
  });

  it('should return correct game summary for a player when matches are empty', () => {
    expect(tournament.getGamesSummary('Player 1')).toBe('0 0');
  });

  it('should throw an error when no player name is provided', () => {
    expect(() => tournament.getGamesSummary('')).toThrow('Please provide query parameter for player name');
  });

  it('should return correct game summary for a player when only one match is present', () => {
    const match1 = new TennisMatch('Player 1', 'Player 2', '1', testData[2].scoreSequence);
    match1.playMatch();
    tournament = new TennisTournament([match1]);
    expect(tournament.getGamesSummary('Player 1')).toBe('6 0');
  });
});
