/**
This component represents the main App for the Scoreboard system.
It initializes a Scoreboard object to keep track of game scores and
renders GameList components to display games that have started, are in progress,
and have finished.
*/
import React, { useState, useEffect } from "react";
import Scoreboard from "./Scoreboards/Scoreboard";
import GameList from "./GameList/GameList";
import Navbar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
const App: React.FC = () => {
  const [summary, setSummary] = useState<string[]>([]);
  const [scoreboard] = useState<Scoreboard>(new Scoreboard(setSummary));

  useEffect(() => {
    const gameData = [
      { homeTeam: "Mexico", awayTeam: "Canada", score: [0, 5], delay: 1000 },
      { homeTeam: "Spain", awayTeam: "Brazil", score: [10, 2], delay: 2000 },
      { homeTeam: "Germany", awayTeam: "France", score: [2, 2], delay: 3000 },
      { homeTeam: "Uruguay", awayTeam: "Italy", score: [6, 6], delay: 4000 },
      { homeTeam: "Argentina", awayTeam: "Australia", score: [3, 1], delay: 5000 },
    ];
  
    const gameTimers = gameData.map((data) => {
      const game = scoreboard.startGame(data.homeTeam, data.awayTeam);
      const [homeScore, awayScore] = data.score;
      const timer = setTimeout(() => scoreboard.updateScore(game, homeScore, awayScore), data.delay);
      return timer;
    });
  
    return () => {
      gameTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [scoreboard]);
  
  const startedGames = scoreboard.games.filter(
    (game) => game.homeScore === 0 && game.awayScore === 0
  );

  const inProgressGames = scoreboard.games.filter(
    (game) => game.homeScore !== 0 && game.awayScore !== 0
  );

  const finishedGames = summary
  .filter((game) => {
    const [homeTeam, homeScore, awayScore, ...awayTeam] = game.split(" ");
    return homeScore !== "0" || awayScore !== "0";
  })
  .map((game) => {
    const [homeTeam, homeScore, awayScore, ...awayTeam] = game.split(" ");
    return `${homeTeam} ${homeScore} - ${awayScore} ${awayTeam.join(" ")} `;
  });


    return (
      <div>
         <Navbar />
        <Container className="App">
          <h1 className="mt-4 mb-4 d-flex justify-content-center"></h1>
          <Row>
            <Col xs={12} md={4}>
              <GameList title="Started Games" games={startedGames} />
            </Col>
            <Col xs={12} md={4}>
              <GameList title="In Progress Games" games={inProgressGames} />
            </Col>
            <Col xs={12} md={4}>
              <GameList title="Summary" games={[]} summary={finishedGames} />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
    
};

export default App;
