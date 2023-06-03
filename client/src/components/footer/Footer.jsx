import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col md={12} className="footer-text">
            Re-created with
            <FontAwesomeIcon className="icon-heart" icon={faHeart} />
            in India by{" "}
            <a className="footer-name" href="https://www.linkedin.com/in/rishabh-sde/" target="_blank">
              Rishabh Raghwendra
            </a>
            ,{" "}
            and{" "}
            <a className="footer-name" href="https://www.linkedin.com/in/anubha-kumari-329753221/" target="_blank">
              Anubha Kumari
            </a>
          </Col>
          <Col className="footer-text-copyright">
            Copyright © 2023 | TaxChain
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
