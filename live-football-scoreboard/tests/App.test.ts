
import Scoreboard from "../src/components/Scoreboards/Scoreboard";

describe("App", () => {
  test("initializes the Scoreboard", () => {
    const mockCallback = jest.fn();
    const scoreboard = new Scoreboard(mockCallback);
    expect(scoreboard).toBeDefined();
  });

  test("starts and updates games", async () => {
    const mockCallback = jest.fn();
    const scoreboard = new Scoreboard(mockCallback);

    const game1 = scoreboard.startGame("Mexico", "Canada");
    const game2 = scoreboard.startGame("Spain", "Brazil");
    const game3 = scoreboard.startGame("Germany", "France");
    const game4 = scoreboard.startGame("Uruguay", "Italy");
    const game5 = scoreboard.startGame("Argentina", "Australia");

    scoreboard.updateScore(game1, 0, 5);
    scoreboard.updateScore(game2, 10, 2);
    scoreboard.updateScore(game3, 2, 2);
    scoreboard.updateScore(game4, 6, 6);
    scoreboard.updateScore(game5, 3, 1);

    const startedGames = scoreboard.games.filter(
      (game) => game.homeScore === 0 && game.awayScore === 0
    );

    const inProgressGames = scoreboard.games.filter(
      (game) => game.homeScore !== 0 || game.awayScore !== 0
    );

    expect(startedGames).toHaveLength(0);
    expect(inProgressGames).toHaveLength(5);

    const game2InProgress = inProgressGames.find((game) => game.homeTeam === "Spain" && game.awayTeam === "Brazil");
    expect(game2InProgress?.homeScore).toBe(10);
    expect(game2InProgress?.awayScore).toBe(2);
  });
});
