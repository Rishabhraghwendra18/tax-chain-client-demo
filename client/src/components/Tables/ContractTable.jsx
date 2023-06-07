import React from "react";
import { Table, Card } from "react-bootstrap";
import { convertBlockcTimeStampToStandardTime } from "../../utils/BlockTimeStampToStandardTime"; 
import { ethers } from "ethers";

function ContractTable(props) {
  {console.log("props: ",props.tableData)}
  return (
    <Card className="constituency-card constituency-transaction-card">
      <h4 className="constituency-transaction-heading ">Previous Contracts</h4>
      <Table
        responsive
        striped
        bordered
        hover
        className="constituency-transaction-table"
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Transcation ID</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.tableData.map((item, index) => (
            <tr key={index}>
              <td>{convertBlockcTimeStampToStandardTime(item.blockTimestamp)}</td>
              <td>{item.transactionHash}</td>
              <td>{ethers.utils.formatUnits(item.wad)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

export default ContractTable;
