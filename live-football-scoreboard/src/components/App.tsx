import React, { useState, useEffect } from "react";
import Scoreboard from "./Scoreboards/Scoreboard";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Navbar,
  Nav,
} from "react-bootstrap";
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
      const [homeTeam, homeScore, awayScore, awayTeam] = game.split(" ");
      return homeScore !== "0" || awayScore !== "0";
    })
    .map((game) => {
      const [homeTeam, homeScore, awayScore, awayTeam] = game.split(" ");
      return `${homeTeam} ${homeScore} - ${awayScore} ${awayTeam} `;
    });

  return (
    <div>
      <Navbar expand="lg" style={{ backgroundColor: "#e3f2fd" }}>
        <Container>
          <Navbar.Brand href="#home">
            <b>Live Football World Cup Scoreboard</b>
          </Navbar.Brand>

          <i className="fas fa-futbol" style={{ fontSize: "24px" }}></i>
        </Container>
      </Navbar>
      <Container className="App">
        <h1 className="mt-4 mb-4 d-flex justify-content-center"></h1>
        <Row>
          <Col xs={12} md={4}>
            <Card>
              <Card.Body>
                <Card.Title className=" d-flex justify-content-center">
                  Started Games
                </Card.Title>
                {startedGames.length > 0 ? (
                  <ListGroup>
                    {startedGames.map((game, index) => (
                      <ListGroup.Item
                        key={index}
                        className="d-flex justify-content-center"
                      >
                        <div className="number">{index + 1}.</div>
                        <i className="fas fa-futbol p-2"></i>
                        {game.homeTeam} {game.homeScore} - {game.awayScore}{" "}
                        {game.awayTeam}{" "}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className=" d-flex justify-content-center">
                    Games are started and are live
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card>
              <Card.Body>
                <Card.Title className=" d-flex justify-content-center">
                  In Progress Games
                </Card.Title>
                {inProgressGames.length > 0 ? (
                  <ListGroup>
                    {inProgressGames.map((game, index) => (
                      <ListGroup.Item
                        key={index}
                        className=" d-flex justify-content-center"
                      >
                        <i className="fas fa-futbol p-2 "></i>
                        <div className="number">{index + 1}.</div>
                        {game.homeTeam} {game.homeScore} - {game.awayScore}{" "}
                        {game.awayTeam}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className=" d-flex justify-content-center">
                    No games in progress
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card>
              <Card.Body>
                <Card.Title className=" d-flex justify-content-center">
                  Summary
                </Card.Title>
                <ListGroup>
                  {summary.map((gameSummary, index) => (
                    <ListGroup.Item
                      key={index}
                      className=" d-flex justify-content-center"
                    >
                      <i className="fas fa-futbol p-2"></i>
                      <div className="number">{index + 1}.</div>
                      {gameSummary}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <footer
        className=" text-center text-lg-start fixed-bottom"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="text-center p-3">Task @2023</div>
      </footer>
    </div>
  );
};

export default App;
