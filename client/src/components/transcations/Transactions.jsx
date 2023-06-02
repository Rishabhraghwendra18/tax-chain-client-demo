import React from "react";
import { Col, Card } from "react-bootstrap";
import FindByYearMonthForm from "../findByYearMonthForm/FindByYearMonthForm.jsx";
import TransactionTable from "../transactionTable/TransactionTable.jsx";

function Transactions(props) {
  return (
    <Col md={12}>
      <Card className="constituency-card constituency-transaction-card">
        <h4 className="constituency-transaction-heading ">{props.heading}</h4>
        <FindByYearMonthForm></FindByYearMonthForm>
        <TransactionTable
          tableHeaders={props.tableHeaders}
          tableData={props.tableData}
        ></TransactionTable>
      </Card>
    </Col>
  );
}

export default Transactions;
