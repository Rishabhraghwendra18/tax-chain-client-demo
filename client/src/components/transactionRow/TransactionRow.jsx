import React from "react";
// import Contract from "../../components/contract/contract.js";
import { bigNumberToEthers } from "../../utils/bigNumberToEther";

function TransactionRow(props) {
  {console.log("data table: ",props.row)}
  return (
    <>
      {props.row.map((item,index) => (
        <tr key={index}>
        <td>{item.transactionHash}</td>
        <td>{item.dst}</td>
        <td>{bigNumberToEthers(item.wad)}</td>
        </tr>
      ))}
    </>
  );
}

export default TransactionRow;
