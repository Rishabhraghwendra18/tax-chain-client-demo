import React from "react";
import Navigation from "../../components/navigation/Navbar";
import {
  Row,
  Col,
  Button,
  Form,
  Card,
  Container,
  Alert,
  Table,
} from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import CitizenTable from "../../components/Tables/CitizenTable.jsx";
import GovernmentTable from "../../components/Tables/GovernmentTable.jsx";
import CurrentTokens from "../../components/currentTokens/CurrentTokens";
import PurchaseTokens from "../../components/purchaseTokens/PurchaseTokens.jsx";
// import Transact from "../../contracts/Transact.json";

function Citizen() {
  return (
    <div className="">
      {/* <Navigation></Navigation> */}
      <Header heading="Citizen: Rohan Singh"></Header>
      <Container>
        <Row>
          <PurchaseTokens web3={web3}></PurchaseTokens>
          <CurrentTokens name="Current Tokens" value="2392138"></CurrentTokens>
        </Row>
      </Container>
      <div className="PayTax my-5">
        <Row>
          <Col sx={12} md={8} id="table">
            <div className="payTax-table">
              <CitizenTable tableData={tableDataCitizen}></CitizenTable>
            </div>
          </Col>
          <Col sx={12} md={4}>
            <div>
              <Card className="table-card">
                <Card.Body>
                  <h2>Pay Tax</h2>
                  {mineMessage ? (
                    <Alert variant="success" className="mb-5">
                      {mineMessage}
                    </Alert>
                  ) : (
                    ""
                  )}

                  <Form>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Control type="number" placeholder="Amount" />
                      </Form.Group>
                    </Form.Row>
                    <Button
                      type="submit"
                      className="constituency-find-btn"
                      onClick={handlePayTax}
                    >
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col className="mt-5">
            <GovernmentTable
              heading={"Track You Tax"}
              tableData={tableDataGovernment}
            ></GovernmentTable>
          </Col>
        </Row>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Citizen;
