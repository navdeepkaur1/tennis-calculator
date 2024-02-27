import { TennisSet } from '../src/tennisSet';
import { TennisGame } from '../src/tennisGame';
import testData from './testData/scores.json';

describe('TennisSet', () => {
  let tennisSet: TennisSet;

  beforeEach(() => {
    tennisSet = new TennisSet('Player 1', 'Player 2');
  });

  it('should correctly return games won and last', () => {
    const game = new TennisGame('Player 1', 'Player 2');
    for (let i = 0; i < 4; i++) {
      game.scoreWonBy(0);
      tennisSet.playGame(game);
    }

    expect(tennisSet.getGamesForSet('Player 1')).toEqual([1, 0]);
    expect(tennisSet.getGamesForSet('Player 2')).toEqual([0, 1]);
  });

  it('should correctly handle winning a set with 6 games', () => {
    const scoreSequence = testData[2].scoreSequence;
    const game = new TennisGame('Player 1', 'Player 2');
    let result = '';
    for (const score of scoreSequence) {
      game.scoreWonBy(score);
      result = tennisSet.playGame(game);
    }
    expect(tennisSet.getGamesForSet('Player 1')).toEqual([6, 0]);
    expect(tennisSet.getGamesForSet('Player 2')).toEqual([0, 6]);
    expect(result).toBe('player1');
  });

  it('should correctly handle resetting games after a set is won', () => {
    const game = new TennisGame('Player 1', 'Player 2');
    const scoreSequence = testData[2].scoreSequence;
    let result = '';
    for (const score of scoreSequence) {
      game.scoreWonBy(score);
      result = tennisSet.playGame(game);
    }
    expect(tennisSet.getGamesForSet('Player 1')).toEqual([6, 0]);
    tennisSet = new TennisSet('Player 1', 'Player 2');
    expect(tennisSet.getGamesForSet('Player 1')).toEqual([0, 0]); // Games reset to 0 after set is won
    expect(tennisSet.getGamesForSet('Player 2')).toEqual([0, 0]);
  });

});
