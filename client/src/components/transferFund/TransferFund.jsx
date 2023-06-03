import React, { useState } from "react";
import { Col, Form, Card } from "react-bootstrap";
import Button from "../button";

function TransferFunds(web3) {
  //   const [toAccount, setToAccount] = useState("");
  //   const [toValue, setToValue] = useState(0);
  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     web3.web3.web3.eth.getAccounts().then(async (accounts) => {
  //       let account = accounts[0];
  //       web3.web3.web3.eth
  //         .sendTransaction({
  //           from: account,
  //           value: toValue,
  //           to: toAccount,
  //         })
  //         .then((result) => {
  //           console.log(result);
  //           alert("SUCCESS");
  //         })
  //         .catch(alert);
  //     });
  //   };
  return (
    <Col md={6}>
      <Card className="constituency-card  constituency-form-card">
        <Form className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Contract ID"
              onChange={(event) => {
                setToAccount(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="number"
              placeholder="Amount"
              onChange={(event) => {
                setToValue(event.target.value);
              }}
            />
          </Form.Group>
          <Button
            className="constituency-form-button-green"
            type="submit"
            style={{width:'fit-content',padding:5}}
            onClick={() => {}}
          >
            Transfer Funds
          </Button>
        </Form>
      </Card>
    </Col>
  );
}

export default TransferFunds;
