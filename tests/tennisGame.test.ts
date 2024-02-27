import { TennisGame } from '../src/tennisGame';

describe('TennisGame', () => {
  let game: TennisGame;

  beforeEach(() => {
    game = new TennisGame('Player 1', 'Player 2');
  });

  it('should initialize with scores 0-0', () => {
    expect(game.score()).toBe('Love-All');
  });

  it('should correctly handle score updates', () => {
    game.scoreWonBy(0); // Player 1 scores
    expect(game.score()).toBe('Fifteen-Love');

    game.scoreWonBy(1); // Player 2 scores
    expect(game.score()).toBe('Fifteen-All');

    game.scoreWonBy(0); // Player 1 scores
    expect(game.score()).toBe('Thirty-Fifteen');
  });

  it('should handle deuce correctly', () => {
    for (let i = 0; i < 3; i++) {
      game.scoreWonBy(0);
      game.scoreWonBy(1);
    }
    expect(game.score()).toBe('Deuce');
  });

  it('should handle advantage correctly', () => {
    for (let i = 0; i < 3; i++) {
      game.scoreWonBy(0);
      game.scoreWonBy(1);
    }
    game.scoreWonBy(0);
    expect(game.score()).toBe('Advantage Player 1');

    game.scoreWonBy(1);
    expect(game.score()).toBe('Deuce');

    game.scoreWonBy(1);
    expect(game.score()).toBe('Advantage Player 2');
  });

  it('should handle win correctly', () => {
    for (let i = 0; i < 4; i++) {
      game.scoreWonBy(0);
    }
    expect(game.score()).toBe('Player 1');
  });

  it('should handle multiple wins correctly', () => {
    for (let i = 0; i < 4; i++) {
      game.scoreWonBy(0);
    }
    expect(game.score()).toBe('Player 1');
  
    game.scoreWonBy(1); // Player 2 scores
    for (let i = 0; i < 4; i++) {
      game.scoreWonBy(1);
    }
    expect(game.score()).toBe('Player 2');
  });

  it('should throw an error for invalid score index', () => {
    expect(() => {
      game.scoreWonBy(2);
    }).toThrow('Invalid score index');
  });

  it('should reset scores correctly after a win', () => {
    for (let i = 0; i < 4; i++) {
      game.scoreWonBy(0);
    }
    expect(game.score()).toBe('Player 1');
    game.scoreWonBy(1); // Player 2 scores
    expect(game.score()).toBe('Love-Fifteen');
  });
});
