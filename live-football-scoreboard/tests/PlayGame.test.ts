import Game from "../src/components/Play/PlayGame";

describe("Game", () => {
  it("should initialize a game with correct values", () => {
    const game = new Game("TeamA", "TeamB");
    expect(game.homeTeam).toBe("TeamA");
    expect(game.awayTeam).toBe("TeamB");
    expect(game.homeScore).toBe(0);
    expect(game.awayScore).toBe(0);
  });

  it("should update the score correctly", () => {
    const game = new Game("TeamA", "TeamB");
    game.updateScore(3, 2);
    expect(game.homeScore).toBe(3);
    expect(game.awayScore).toBe(2);
  });

  it("should calculate the total score correctly", () => {
    const game = new Game("TeamA", "TeamB");
    game.updateScore(3, 2);
    expect(game.totalScore).toBe(5);
  });
});
