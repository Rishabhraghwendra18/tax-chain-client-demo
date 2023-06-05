import React,{useEffect, useState} from "react";
import { useContractWrite, useContractRead, useContract,useAddress,useDisconnect } from "@thirdweb-dev/react";
import { Row, Col, Button, Form, Card, Container } from "react-bootstrap";
import {WETHQueryFromSource} from "../../services/WETHQuery";
import { bigNumberToEthers } from "../../utils/bigNumberToEther";
import Navigation from "../../components/navigation/Navbar";
import "./constituency.css";
import Footer from "../../components/footer/Footer.jsx";
import Header from "../../components/header/Header.jsx";
import Fund from "../../components/fund/Fund.jsx";
import TransferFunds from "../../components/transferFund/TransferFund.jsx";
import Transactions from "../../components/transcations/Transactions";
import Kyc from "../../components/kyc/Kyc.jsx";
import WETHABI from "../../contractsABI/WETH.json";
import CONSTITUENCYABI from "../../contractsABI/Constituency.json";
import REGISTERYABI from "../../contractsABI/Registery.json";

const WETH_ADDRESS = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
const CONSTITUENCY_ADDRESS= '0x089AC0B06277915174e57DbDF361B026D77209F6';
const REGISTERY_ADDRESS = import.meta.env.VITE_REGISTERY_ADDRESS;

function Constituency() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const [isTransferLoading, setIsTransferLoading] = useState(false);
  const [transcationList, setTranscationList] = useState([]);
  const [constituencyAddress, setConstituencyAddress] = useState(CONSTITUENCY_ADDRESS);
  const { contract:registeryContract,isLoading: isCregisteryContractLoading, error:registeryContractError } = useContract(REGISTERY_ADDRESS,REGISTERYABI);

  const {data:userConstituency,isLoading:userConstituencyIsLoading,error:userConstituencyError} = useContractRead(
    registeryContract,
    "getConstituency",
    [address]
  );

  const { contract:WETHContract,isLoading: isContractLoading, error:contractError } = useContract(WETH_ADDRESS,WETHABI);
  const { contract:constituencyContract,isLoading: isCConstituencyContractLoading, error:constituencyContractError } = useContract(userConstituency,CONSTITUENCYABI);

  const { data:constituencyWETHBalance, isLoading, error } = useContractRead(
    WETHContract,
    "balanceOf",
    [userConstituency]
  );
  const {data:constituencyUsedWETHAmount,isLoading:constituencyUsedWETHLoading,error:constituencyUsedWETHError} = useContractRead(
    constituencyContract,
    "usedFunds"
  );

  useEffect(()=>{
    getConstituencyTransfers();
    return disconnect;
  },[]);
  const getConstituencyTransfers = async () =>{
    const {data}=await WETHQueryFromSource(CONSTITUENCY_ADDRESS);
    setTranscationList(data.transfers);
  }

  return (
    <div>
      <Navigation></Navigation>
      <Header heading={`Constituency Address: ${userConstituency}`}></Header>
      <Container className="my-5">
        <Row>
          <Fund name="Alloted Funds" value={`${constituencyWETHBalance!==undefined ? bigNumberToEthers(constituencyWETHBalance):'0.0'} WETH`}></Fund>
          <Fund name="Used Funds" value={`${constituencyUsedWETHAmount!== undefined ? bigNumberToEthers(constituencyUsedWETHAmount):'0.0'} WETH`}></Fund>
        </Row>
        <Row>
          <TransferFunds onSuccess={getConstituencyTransfers}></TransferFunds>
          <Kyc web3={web3}></Kyc>
        </Row>

        {/* form below */}

        <div>
          <Card className="table-card">
            <Card.Body>
              <h2 className="text-center">Add Contractor</h2>
              <Form className="d-flex flex-column">
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
                <button
                  type="submit"
                  className="constituency-find-btn"
                  onClick={() => {}}
                >
                  Submit
                </button>
              </Form>
            </Card.Body>
          </Card>
          <Transactions
            heading="Previous Funds Transfer"
            tableHeaders={["Transcation ID","ContractId", "Amount"]}
            tableData={transcationList}
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
