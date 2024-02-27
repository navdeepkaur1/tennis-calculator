import * as fs from 'fs';
import { ReadAndProcessInput } from '../src/readAndProcessInput';

jest.mock('fs');

describe('ReadAndProcessInput', () => {
  describe('readAndProcessInputFromFile', () => {
    it('should return matches from the input file', () => {
      const inputLines = ['Match: 1', 'Person A vs Person B', '0', '1'];
      (fs.readFileSync as jest.Mock).mockReturnValue(inputLines.join('\n'));
      const reader = new ReadAndProcessInput('../tests/testData/testInput.txt');
      const matches = reader.readAndProcessInputFromFile();
      expect(matches).toBeDefined();
      expect(matches!.length).toBe(1);
    });

    it('should return undefined if no filename is provided', () => {
      const reader = new ReadAndProcessInput('');
      const matches = reader.readAndProcessInputFromFile();
      expect(matches).toBeUndefined();
    });

    it('should return correct match Id', () => {
        const inputLines = ['Match: 1', 'Person A vs Person B', '0', '1'];
        (fs.readFileSync as jest.Mock).mockReturnValue(inputLines.join('\n'));
        const reader = new ReadAndProcessInput('../tests/testData/testInput.txt');
        const matches = reader.readAndProcessInputFromFile();
        expect(matches).toBeDefined();
        expect(matches![0].getMatchId()).toBe('1');
      });

      it('should return multiple matches from the input file', () => {
        const inputLines = ['Match: 1', 'Person A vs Person B', '0', '1', 'Match: 2', 'Person C vs Person D', '0', '1'];
        (fs.readFileSync as jest.Mock).mockReturnValue(inputLines.join('\n'));
        const reader = new ReadAndProcessInput('../tests/testData/testInput.txt');
        const matches = reader.readAndProcessInputFromFile();
        expect(matches).toBeDefined();
        expect(matches!.length).toBe(2);
      });
  });
});
