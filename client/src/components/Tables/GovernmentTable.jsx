import React from "react";
import { Table, Card } from "react-bootstrap";
import {bigNumberToEthers} from "../../utils/bigNumberToEther";
import {convertBlockcTimeStampToStandardTime} from "../../utils/BlockTimeStampToStandardTime";

function GovernmentTable(props) {
  return (
    <Card className="constituency-card constituency-transaction-card">
      <h4 className="constituency-transaction-heading ">{props.heading}</h4>
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
            {/* <th>Constituency</th> */}
          </tr>
        </thead>
        <tbody>
          {props.tableData.map((item, index) => (
            <tr key={index}>
              <td>{convertBlockcTimeStampToStandardTime(item.blockTimestamp)}</td>
              <td>{item.transactionHash}</td>
              <td>{bigNumberToEthers(item.wad)}</td>
              {/* <td key={item.constituency}>{item.constituency}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

export default GovernmentTable;
