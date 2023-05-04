import React from "react";
import { Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#e3f2fd" }}>
      <Container className="text-center  py-3 fixed-bottom" style={{ backgroundColor: "#e3f2fd" }}>
        <Row className="justify-content-center">
          <div>Task @2023</div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
