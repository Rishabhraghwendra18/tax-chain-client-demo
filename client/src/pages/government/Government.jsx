import React from "react";
import Navigation from "../../components/navigation/Navbar";
import { Row, Col, Card, Container } from "react-bootstrap";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer.jsx";
import Fund from "../../components/fund/Fund.jsx";
import CreateTable from "../../components/Tables/GovernmentTable.jsx";
import AddConstituency from "../../components/addConstituency/AddConstituency.jsx";
import "./government.css";

function Government() {
  return (
    <>
      <Navigation></Navigation>
      <Header heading="Government of India"></Header>
      <Container>
        <div className="Government mb-5">
          <Row>
            <Fund name="Total Funds" value="2392138"></Fund>
            <Fund name="Used Funds" value="3202"></Fund>
          </Row>
          <Row>
            <Col sm={12} md={8}>
              {/* <Transactions 
                      heading='Transactions' 
                      tableHeaders={["ConstituencyID", "Amount", "Date"]} 
                      tableData={tableData}
                    ></Transactions> */}
              <CreateTable
                heading={"Previous Transfers"}
                tableData={[]}
              ></CreateTable>
            </Col>
            <Col sm={12} md={4}>
              <div className="Government-form">
                <Card className="table-card mt-3">
                  <Card.Body>
                    <h3 className="table-heading text-center">Transfer Funds</h3>
                    <div className="Government-form-wrapper">
                      <div className="currentFund text-center">
                        <h1>25M</h1>
                        <p>Total Funds</p>
                      </div>
                      <form action="" className="d-flex flex-column align-items-center">
                        <input
                          type="text"
                          placeholder="Enter constituency ID"
                          onChange={(event) => {
                            setConstId(event.target.value);
                          }}
                        />
                        <input
                          type="number"
                          placeholder="Amount"
                          onChange={(event) => {
                            setAmount(event.target.value);
                          }}
                        />
                        <input
                          type="text"
                          id="projectName"
                          placeholder="Description"
                        />

                        <button
                          type="submit"
                          className="shadow-md"
                          onClick={() => {}}
                        >
                          TRANSFER
                        </button>
                      </form>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
          <Row>
            <AddConstituency web3={web3}></AddConstituency>
          </Row>
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default Government;
