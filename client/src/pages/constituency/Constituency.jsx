import React from "react";
import Navigation from "../../components/navigation/Navbar";
import "./constituency.css";
import { Row, Col, Button, Form, Card, Container } from "react-bootstrap";
import Footer from "../../components/footer/Footer.jsx";
import Header from "../../components/header/Header.jsx";
import Fund from "../../components/fund/Fund.jsx";
import TransferFunds from "../../components/transferFund/TransferFund.jsx";
import Transactions from "../../components/transcations/Transactions";
import Kyc from "../../components/kyc/Kyc.jsx";

function Constituency() {
  return (
    <div>
      <Navigation></Navigation>
      <Header heading="Malviya Nagar Constituency"></Header>
      <Container className="my-5">
        <Row>
          <Fund name="Alloted Funds" value="2392138"></Fund>
          <Fund name="Used Funds" value="3202"></Fund>
        </Row>
        <Row>
          <TransferFunds web3={web3}></TransferFunds>
          <Kyc web3={web3}></Kyc>
        </Row>

        {/* form below */}

        <div>
          <Card className="table-card">
            <Card.Body>
              <h2>Add Contractor</h2>
              <Form>
                <Form>
                  <Form.Group as={Col}>
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="0x0000000000000000"
                      onChange={(v) => {
                        setAcc(v.target.value);
                      }}
                    />
                  </Form.Group>
                </Form>
                <Button
                  type="submit"
                  className="constituency-find-btn"
                  onClick={() => {}}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Transactions
            heading="Previous Funds Transfer"
            tableHeaders={["ContractId", "Amount"]}
            tableData={[]}
          ></Transactions>
        </div>
      </Container>

      {/* form above */}

      <div className="constituency-above-footer"></div>
      <Footer></Footer>
    </div>
  );
}

export default Constituency;
