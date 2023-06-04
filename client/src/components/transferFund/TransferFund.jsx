import React, { useState } from "react";
import { useContractWrite, useContractRead, useContract,useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Col, Form, Card } from "react-bootstrap";
import Button from "../button";
import CONSTITUENCYABI from "../../contractsABI/Constituency.json";

const CONSTITUENCY_ADDRESS= '0x089AC0B06277915174e57DbDF361B026D77209F6';

function TransferFunds({onSuccess}) {
  const [isTransferLoading, setIsTransferLoading] = useState(false);
  const [toAccount, setToAccount] = useState('');
  const [toValue, setToValue] = useState('');

  const { contract:constituencyContract,isLoading: isCConstituencyContractLoading, error:constituencyContractError } = useContract(CONSTITUENCY_ADDRESS,CONSTITUENCYABI);
  const {mutateAsync:constituencyTranferWETHAmount,isLoading:constituencyTransferWETHLoading,error:constituencyTransferWETHError} = useContractWrite(
    constituencyContract,
    "transferTo"
  );
  const handleTransferToContractor = async (event,data) => {
    event.preventDefault();
    setIsTransferLoading(true);
    if(!toAccount && !toValue) return;
    await constituencyTranferWETHAmount({
      args: [toAccount, ethers.utils.parseEther(toValue)],
    });
    await onSuccess();
    setIsTransferLoading(false);
  };

  return (
    <Col md={6}>
      <Card className="constituency-card  constituency-form-card">
        <Form className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Contract ID"
              onChange={(event) => {
                setToAccount(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="number"
              placeholder="Amount"
              onChange={(event) => {
                setToValue(event.target.value);
              }}
            />
          </Form.Group>
          <Button
            className="constituency-form-button-green"
            type="submit"
            style={{width:'fit-content',padding:5}}
            onClick={handleTransferToContractor}
            disabled={isTransferLoading}
          >
            {isTransferLoading ? "Transcation in process":"Transfer Funds"}
          </Button>
        </Form>
      </Card>
    </Col>
  );
}

export default TransferFunds;
