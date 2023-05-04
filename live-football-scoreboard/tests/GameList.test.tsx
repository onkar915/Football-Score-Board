import React from "react";
import ReactDOM from "react-dom";
import GameList from "../src/components/GameList/GameList";

describe("GameList Component", () => {
  test("renders without crashing", () => {
    const root = document.createElement("div");
    ReactDOM.render(<GameList title="Test Title" games={[]} />, root);
    ReactDOM.unmountComponentAtNode(root);
  });

  test("renders games correctly", () => {
    const testGames = [
      { homeTeam: "TeamA", homeScore: 1, awayScore: 2, awayTeam: "TeamB" },
      { homeTeam: "TeamC", homeScore: 3, awayScore: 0, awayTeam: "TeamD" },
    ];

    const root = document.createElement("div");
    ReactDOM.render(<GameList title="Test Title" games={testGames} />, root);

    const gameElements = root.querySelectorAll(".list-group-item");

    testGames.forEach((game, index) => {
      const gameText = gameElements[index].textContent;
      expect(gameText).toContain(`${index + 1}.`);
      expect(gameText).toContain(
        `${game.homeTeam} ${game.homeScore} - ${game.awayScore} ${game.awayTeam}`
      );
    });

    ReactDOM.unmountComponentAtNode(root);
  });
});
