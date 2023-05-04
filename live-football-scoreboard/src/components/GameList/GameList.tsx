import React from "react";
import { Card, ListGroup } from "react-bootstrap";

// Interface defining the shape of a game object
interface Game {
  homeTeam: string;
  homeScore: number;
  awayScore: number;
  awayTeam: string;
}

// Interface defining the props for the GameList component
interface GameListProps {
  title: string;
  games: Game[];
  summary?: string[];
}

// GameList component that renders a list of games
const GameList: React.FC<GameListProps> = ({ title, games, summary }) => (
  <Card>
    <Card.Body>
      <Card.Title className="d-flex justify-content-center">{title}</Card.Title>
      <ListGroup>
        {/* If there are games available */}
        {games.length > 0 ? (
          games.map((game, index) => (
            // Render each game as a list item
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-center"
            >
              {/* Icon for the game */}
              <i className="fas fa-futbol p-2"></i>
              {/* Game details */}
              {index + 1}. {game.homeTeam} {game.homeScore} - {game.awayScore}{" "}
              {game.awayTeam}
            </ListGroup.Item>
          ))
        ) : summary ? (
          summary.map((gameSummary, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-center"
            >
              <i className="fas fa-futbol p-2"></i>
              {index + 1}. {gameSummary}
            </ListGroup.Item>
          ))
        ) : (
          <p className="d-flex justify-content-center">No games available</p>
        )}
      </ListGroup>
    </Card.Body>
  </Card>
);

export default GameList;
