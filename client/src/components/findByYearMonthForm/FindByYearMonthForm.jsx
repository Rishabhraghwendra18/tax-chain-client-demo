import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import Button from "../button";

function FindByYearMonthForm() {
  return (
    <Form>
      <Row>
        <Col md={4}>
          <Form.Group>
            <Form.Label className="constituency-form-label">Year</Form.Label>
            <Form.Control as="select" custom>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Month</Form.Label>
            <Form.Control as="select" custom>
              <option>Jan</option>
              <option>Feb</option>
              <option>March</option>
              <option>April</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={2} className="d-flex align-items-center justify-content-center">
          {" "}
          <Button style={{width:'80%',padding:5,margin:0,marginTop:'auto'}} type="submit">
            Find
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FindByYearMonthForm;
