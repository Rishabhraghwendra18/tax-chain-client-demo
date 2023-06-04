import React from "react";
// import Contract from "../../components/contract/contract.js";
import { bigNumberToEthers } from "../../utils/bigNumberToEther";

function TransactionRow(props) {
  return (
    <tr>
      {props.row.map((item,index) => (
        <>
        <td key={index}>{item.dst}</td>
        <td key={index}>{bigNumberToEthers(item.wad)}</td>
        </>
      ))}
    </tr>
  );
}

export default TransactionRow;
