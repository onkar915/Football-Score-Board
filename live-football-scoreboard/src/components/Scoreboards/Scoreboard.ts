import Game from "../Play/PlayGame";

type UpdateSummaryCallback = (summary: string[]) => void;

class Scoreboard {
  games: Game[];
  updateSummaryCallback: UpdateSummaryCallback;

  constructor(updateSummaryCallback: UpdateSummaryCallback) {
    this.games = [];
    this.updateSummaryCallback = updateSummaryCallback;
  }

  startGame(homeTeam: string, awayTeam: string) {
    // Check if a game with the same teams already exists
    const existingGame = this.games.find(
      (game) =>
        game.homeTeam === homeTeam &&
        game.awayTeam === awayTeam &&
        game.homeScore === 0 &&
        game.awayScore === 0
    );

    // If a game with the same teams already exists, return it without creating a new game
    if (existingGame) {
      return existingGame;
    }

    // If no existing game is found, create a new game and add it to the games list
    const game = new Game(homeTeam, awayTeam);
    this.games.push(game);
    this.getSummary();
    return game;
  }

  updateScore(game: Game, homeScore: number, awayScore: number) {
    game.updateScore(homeScore, awayScore);
    this.getSummary();
  }

  finishGame(game: Game) {
    this.games = this.games.filter((g) => g !== game);
    this.getSummary();
  }

  getSummary() {
    const finishedGames = this.games.filter(
      (game) => game.homeScore !== 0 || game.awayScore !== 0
    );

    const summary = finishedGames
      .sort((a, b) => {
        if (a.totalScore !== b.totalScore) {
          return b.totalScore - a.totalScore;
        }
        return this.games.indexOf(b) - this.games.indexOf(a);
      })
      .map(
        (game) =>
          `${game.homeTeam} ${game.homeScore} -  ${game.awayScore} ${game.awayTeam}`
      );

    this.updateSummaryCallback(summary);
  }
}

export default Scoreboard;
