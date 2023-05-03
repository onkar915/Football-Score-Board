// tests/Scoreboard.test.ts
import Scoreboard from "../src/components/Scoreboards/Scoreboard";
import Game from "../src/components/Play/PlayGame";

describe("Scoreboard", () => {
  let summary: string[];
  let updateSummaryCallback: (updatedSummary: string[]) => void;

  beforeEach(() => {
    summary = [];
    updateSummaryCallback = (updatedSummary: string[]) => {
      summary = updatedSummary;
    };
  });

  it("should start a new game and add it to the games list", () => {
    const scoreboard = new Scoreboard(updateSummaryCallback);
    const game = scoreboard.startGame("TeamA", "TeamB");
    expect(scoreboard.games.length).toBe(1);
    expect(scoreboard.games[0]).toBe(game);
  });

  it("should not start a new game with the same teams", () => {
    const scoreboard = new Scoreboard(updateSummaryCallback);
    const game1 = scoreboard.startGame("TeamA", "TeamB");
    const game2 = scoreboard.startGame("TeamA", "TeamB");
    expect(scoreboard.games.length).toBe(1);
    expect(game1).toBe(game2);
  });

  it("should update the score and update the summary", () => {
    const scoreboard = new Scoreboard(updateSummaryCallback);
    const game = scoreboard.startGame("TeamA", "TeamB");
    scoreboard.updateScore(game, 3, 2);
    expect(game.homeScore).toBe(3);
    expect(game.awayScore).toBe(2);
    expect(summary).toEqual(["TeamA 3 - TeamB 2"]);
  });

  it("should finish a game and remove it from the games list", () => {
    const scoreboard = new Scoreboard(updateSummaryCallback);
    const game = scoreboard.startGame("TeamA", "TeamB");
    scoreboard.finishGame(game);
    expect(scoreboard.games.length).toBe(0);
  });

  it("should sort finished games by total score and order of insertion", () => {
    const scoreboard = new Scoreboard(updateSummaryCallback);
    const game1 = scoreboard.startGame("TeamA", "TeamB");
    const game2 = scoreboard.startGame("TeamC", "TeamD");
    const game3 = scoreboard.startGame("TeamE", "TeamF");

    scoreboard.updateScore(game1, 3, 2); // Total score: 5
    scoreboard.updateScore(game2, 4, 1); // Total score: 5
    scoreboard.updateScore(game3, 1, 1); // Total score: 2

    const finishedGames = scoreboard.games.filter(
      (game) => game.homeScore !== 0 || game.awayScore !== 0
    );

    expect(finishedGames).toEqual([game1, game2, game3]);
  });

});
