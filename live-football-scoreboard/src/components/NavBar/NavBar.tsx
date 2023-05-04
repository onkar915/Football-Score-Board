import React from "react";
import { Navbar, Container } from "react-bootstrap";

const CustomNavbar: React.FC = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#e3f2fd" }}>
      <Container>
        <Navbar.Brand href="#home">
          <b>Live Football World Cup Scoreboard</b>
        </Navbar.Brand>
        <i className="fas fa-futbol" style={{ fontSize: "24px" }}></i>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
