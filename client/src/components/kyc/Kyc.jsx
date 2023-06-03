import React, { useState } from "react";
import { Col, Form, Card } from "react-bootstrap";
import Button from "../button";
// import KYC from '../../contracts/KYC.json';

export default function Kyc(web3) {
  // const [acc, setAcc] = useState('');
  // const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     web3.web3.web3.eth.getAccounts().then(async (accounts) => {
  //         let account = accounts[0];
  //         let networkId = await web3.web3.web3.eth.net.getId();
  //         let contractAddress = KYC.networks[networkId].address;
  //         let kycContract = new web3.web3.web3.eth.Contract(
  //             KYC.abi,
  //             KYC.networks[networkId] && KYC.networks[networkId].address
  //         );
  //         kycContract.methods
  //             .completeKYC(acc)
  //             .send({ from: account })
  //             .then((result) => {
  //                 console.log(result);
  //                 alert('Successful');
  //             })
  //             .catch(alert);
  //     });
  // };
  return (
    <Col md={6}>
      <Card className="constituency-card  constituency-form-card">
        <Form className="d-flex flex-column">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              onChange={(event) => {
                setAcc(event.target.value);
              }}
            />
          </Form.Group>
          <Button
            className="constituency-form-button-green"
            type="submit"
            onClick={() => {}}
            style={{width:'fit-content',padding:5}}
          >
            Confirm KYC
          </Button>
        </Form>
      </Card>
    </Col>
  );
}
