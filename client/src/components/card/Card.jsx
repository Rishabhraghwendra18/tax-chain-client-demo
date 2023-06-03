import React from "react";
import { Col, Card } from "react-bootstrap";
import "./card.css";

function WhiteCard({ caption, title, imgUrl }) {
  return (
    <Col md={6} className="d-flex align-items-center justify-content-center">
      <Card className="card-home">
        <img className="card-home-img-top" variant="top" src={imgUrl} />
        <Card.Body>
          <Card.Title className="text-center">{title}</Card.Title>
          <Card.Text className="card-text-justify">{caption}</Card.Text>
        </Card.Body>
      </Card>{" "}
    </Col>
  );
}

export default WhiteCard;
