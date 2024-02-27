import { TennisMatch } from '../src/tennisMatch';
import testData from './testData/scores.json';

describe('TennisMatch', () => {
  let tennisMatch: TennisMatch;

  beforeEach(() => {
    tennisMatch = new TennisMatch('Player 1', 'Player 2', '1');
  });

  it('should initialize with 0 sets won for both players', () => {
    expect(tennisMatch.getMatchResult()).toBe('Match in progress');
    expect(tennisMatch.getGamesForMatch('Player 1')).toEqual([0, 0]);
    expect(tennisMatch.getGamesForMatch('Player 2')).toEqual([0, 0]);
  });

  it('should return valid match id', () => {
    tennisMatch = new TennisMatch('Player 1', 'Player 2', '04', [0, 0, 0, 0, 0]);
    expect(tennisMatch.getMatchId()).toBe('04');
  });

  it('should correctly handle winning match by Player 1', () => {
    tennisMatch = new TennisMatch('Player 1', 'Player 2', '1', testData[0].scoreSequence);
    tennisMatch.playMatch();
    expect(tennisMatch.getMatchResult()).toBe('Match 1 \n Player 1 defeated Player 2 \n 2 sets to 0');
    expect(tennisMatch.getGamesForMatch('Player 1')).toEqual([12, 0]);
    expect(tennisMatch.getGamesForMatch('Player 2')).toEqual([0, 12]);
  });

  it('should correctly handle winning match by Player 2', () => {
    tennisMatch = new TennisMatch('Player 1', 'Player 2', '1', testData[1].scoreSequence);
    tennisMatch.playMatch();
    expect(tennisMatch.getMatchResult()).toBe('Match 1 \n Player 2 defeated Player 1 \n 2 sets to 0');
    expect(tennisMatch.getGamesForMatch('Player 1')).toEqual([0, 12]);
    expect(tennisMatch.getGamesForMatch('Player 2')).toEqual([12, 0]);
  });

  it('should correctly handle a match in progress', () => {
    tennisMatch = new TennisMatch(
      'Player 1',
      'Player 2',
      '1',
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    );
    tennisMatch.playMatch();
    expect(tennisMatch.getMatchResult()).toBe('Match in progress');
  });
});
