import React, { useState } from "react";
import { Col, Form, Card } from "react-bootstrap";
import Button from "../button";
// import Transact from '../../contracts/Transact.json';

import "./purchaseTokens.css";

export default function PurchaseTokens({purhcaseTokens}) {
  const [val, setValue] = useState(0);
  const buyWETH = async ()=>{
    await purhcaseTokens(val);
  }
  return (
    <Col md={6}>
      <Card className="pt-card">
        <Card.Body>
          <h4 className="pt-heading">Purchase Tokens</h4>
          <Form style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter amount"
                value={0.1}
                onChange={(v) => {
                  setValue(v.target.value);
                }}
              />
            </Form.Group>
            <Button
              className="pt-find-btn btn btn-primary"
              type="submit"
              onClick={buyWETH}
              style={{width:'fit-content',padding:10}}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}
