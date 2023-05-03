import React, { useState, useEffect } from "react";
import Scoreboard from "./Scoreboards/Scoreboard";
import Game from "./Play/PlayGame";
import { ListGroup, ListGroupItem, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const [summary, setSummary] = useState<string[]>([]);
  const [scoreboard] = useState<Scoreboard>(new Scoreboard(setSummary));

  useEffect(() => {
    const game1 = scoreboard.startGame("Mexico", "Canada");
    const game2 = scoreboard.startGame("Spain", "Brazil");
    const game3 = scoreboard.startGame("Germany", "France");
    const game4 = scoreboard.startGame("Uruguay", "Italy");
    const game5 = scoreboard.startGame("Argentina", "Australia");

    const timer1 = setTimeout(() => scoreboard.updateScore(game1, 0, 5), 1000);
    const timer2 = setTimeout(() => scoreboard.updateScore(game2, 10, 2), 2000);
    const timer3 = setTimeout(() => scoreboard.updateScore(game3, 2, 2), 3000);
    const timer4 = setTimeout(() => scoreboard.updateScore(game4, 6, 6), 4000);
    const timer5 = setTimeout(() => scoreboard.updateScore(game5, 3, 1), 5000);

    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
 
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
    const [homeTeam, homeScore, awayTeam, awayScore] = game.split(" ");
    return homeScore !== "0" || awayScore !== "0";
  })
  .map((game) => {
    const [homeTeam, homeScore, awayTeam, awayScore] = game.split(" ");
    return `${homeTeam} ${homeScore} - ${awayTeam} ${awayScore}`;
  });

    
  return (
    <Container className="App">
      <h1 className="mt-4 mb-4">Live Football World Cup Scoreboard</h1>
      <Row>
      <Col xs={12} md={4}>
  <h3>Started Games</h3>
  {startedGames.length > 0 ? (
    <ListGroup>
      {startedGames.map((game, index) => (
        <ListGroup.Item key={index}>
          {game.homeTeam} {game.homeScore} - {game.awayTeam} {game.awayScore}
        </ListGroup.Item>
      ))}
    </ListGroup>
  ) : (
    <p>Games are started and are live</p>
  )}
</Col>

        <Col xs={12} md={4}>
  <h3>In Progress Games</h3>
  {inProgressGames.length > 0 ? (
    <ListGroup>
      {inProgressGames.map((game, index) => (
        <ListGroup.Item key={index}>
          {game.homeTeam} {game.homeScore} - {game.awayTeam} {game.awayScore}
        </ListGroup.Item>
      ))}
    </ListGroup>
  ) : (
    <p>No games in progress</p>
  )}
</Col>

        <Col xs={12} md={4}>
          <h3>Summary</h3>
          <ListGroup>
            {summary.map((gameSummary, index) => (
              <ListGroup.Item key={index}>{gameSummary}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
