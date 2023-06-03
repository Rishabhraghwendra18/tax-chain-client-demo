import React from "react";
import { Col, Form, Card } from "react-bootstrap";
import Button from "../button";
import "./generateContract.css";

function GenerateContract() {
  return (
    <>
      <Col md={2}></Col>
      <Col md={8}>
        <Card className="gc-card">
          <Form className="d-flex flex-column gap-3">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Contract Title"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Contract Description"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Form.Group>
            <Button
              className="constituency-form-button-green"
              type="submit"
              onClick={() => {}}
              style={{width:'fit-content',padding:5}}
            >
              Generate Contract
            </Button>
          </Form>
        </Card>
      </Col>
      <Col md={2}></Col>
    </>
  );
}

export default GenerateContract;
