import { TennisTournament } from './tournament';
import { ReadAndProcessInput } from './readAndProcessInput';

const args = process.argv.slice(2);
const fileName = args[0];
const matchResultQuery = args[1];
const playerGamesQuery = args[2];
let fullTournament: TennisTournament;

if (fileName) {
  const inputFilename = `./data/${fileName}`;
  const readInput = new ReadAndProcessInput(inputFilename);
  const matches = readInput.readAndProcessInputFromFile();

  if (matches) {
    fullTournament = new TennisTournament(matches);

    if (matchResultQuery && matchResultQuery.startsWith('Score Match ')) {
      const matchId = matchResultQuery.split('Score Match ')[1];
      if (matchId) {
        const matchToQuery = matches.find((match) => match.getMatchId() === matchId);
        if (matchToQuery) {
          console.log('Query 1: Summary of match result');
          console.log(`Score ${matchToQuery.getMatchResult()}`);
        }
      }
    }

    if (playerGamesQuery && playerGamesQuery.startsWith('Games Player ')) {
      const playerName = playerGamesQuery.split('Games Player ')[1];
      if (playerName) {
        console.log('Query 2: Summary of games won vs lost for a particular player');
        console.log(`Games Player ${playerName} \n ${fullTournament.getGamesSummary(playerName)}`);
      }
    }
  }
}
