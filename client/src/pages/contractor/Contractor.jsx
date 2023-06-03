import React from "react";
import Navigation from "../../components/navigation/Navbar";
import "./contractor.css";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import Footer from "../../components/footer/Footer.jsx";
import Header from "../../components/header/Header.jsx";
import GenerateContract from "../../components/generateContract/GenerateContract.jsx";
import ContractTable from "../../components/Tables/ContractTable.jsx";

function Contractor() {
  return (
    <div>
      <Navigation></Navigation>
      <Header heading="Contractor: Rahul Sharma"></Header>
      <Container>
        <Row>
          <GenerateContract web3={web3}></GenerateContract>
          <Col md={12}>
            <Card className="table-card">
              <Card.Body>
                <ContractTable tableData={[]}></ContractTable>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default Contractor;
