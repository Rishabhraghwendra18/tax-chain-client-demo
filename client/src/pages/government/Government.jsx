import React, { useState,useEffect } from "react";
import {
  useContractWrite,
  useContractRead,
  useContract,
  useAddress,
  useDisconnect
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { gql,cacheExchange, createClient, dedupExchange, fetchExchange } from "urql";
import {WETHQueryFromSource} from "../../services/WETHQuery";
import { bigNumberToEthers } from "../../utils/bigNumberToEther";
import Navigation from "../../components/navigation/Navbar";
import { Row, Col, Card, Container } from "react-bootstrap";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer.jsx";
import Fund from "../../components/fund/Fund.jsx";
import CreateTable from "../../components/Tables/GovernmentTable.jsx";
import AddConstituency from "../../components/addConstituency/AddConstituency.jsx";
import WETHABI from "../../contractsABI/WETH.json";
import GOVTABI from "../../contractsABI/Govt.json";
import "./government.css";

const WETH_ADDRESS = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
const GOVT_ADDRESS = import.meta.env.VITE_GOVT_ADDRESS;
const CONSTITUENCY_ADDRESS = "0x089AC0B06277915174e57DbDF361B026D77209F6";
const REGISTERY_ADDRESS = import.meta.env.VITE_REGISTERY_ADDRESS;

function Government() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const [constituencyAddress, setConstituencyAddress] = useState('');
  const [isTransferLoading, setIsTransferLoading] = useState(false);
  const [transcationsList, setTranscationsList] = useState([]);
  const [transferAmount, setTransferAmount] = useState(0.1);
  const {
    contract: WETHContract,
    isLoading: isContractLoading,
    error: contractError,
  } = useContract(WETH_ADDRESS, WETHABI);
  const {
    contract: GovtContract,
    isLoading: isGovtContractLoading,
    error: GovtContractError,
  } = useContract(GOVT_ADDRESS, GOVTABI);

  const {
    data: govtWETHBalance,
    isLoading,
    error,
  } = useContractRead(WETHContract, "balanceOf", [GOVT_ADDRESS]);
  const {
    data: govtUsedWETHAmount,
    isLoading: govtUsedWETHLoading,
    error: govtUsedWETHError,
  } = useContractRead(GovtContract, "usedFunds");
  const {
    mutateAsync: govtTranferWETHAmount,
    isLoading: govtTransferWETHLoading,
    error: govtTransferWETHError,
  } = useContractWrite(GovtContract, "transferTo");
  
  useEffect(()=>{
    queryGovtTransfers();
    return disconnect;
  },[])
  const queryGovtTransfers = async ()=>{
    const {data} = await WETHQueryFromSource(GOVT_ADDRESS);
    setTranscationsList(data.transfers);
  }
  const handleTransferToConstituency = async (event) => {
    event.preventDefault();
    setIsTransferLoading(true);
    try {
      await govtTranferWETHAmount({
        args: [constituencyAddress, ethers.utils.parseEther(transferAmount)],
      });
      await queryGovtTransfers();
    } catch (error) {
      console.log("error occurent in govt: ",error);
    }
    setIsTransferLoading(false);
  };
  return (
    <>
      <Navigation></Navigation>
      <Header heading={`Govt Address: ${GOVT_ADDRESS}`}></Header>
      <Container>
        <div className="Government mb-5">
          <Row>
            <Fund
              name="Total Funds"
              value={`${
                govtWETHBalance !== undefined
                  ? bigNumberToEthers(govtWETHBalance)
                  : "0.0"
              } WETH`}
            ></Fund>
            <Fund
              name="Used Funds"
              value={`${
                govtUsedWETHAmount !== undefined
                  ? bigNumberToEthers(govtUsedWETHAmount)
                  : "0.0"
              } WETH`}
            ></Fund>
          </Row>
          <Row>
            <Col sm={12} md={9}>
              {/* <Transactions 
                      heading='Transactions' 
                      tableHeaders={["ConstituencyID", "Amount", "Date"]} 
                      tableData={tableData}
                    ></Transactions> */}
              <CreateTable
                heading={"Previous Transfers"}
                tableData={transcationsList}
              ></CreateTable>
            </Col>
            <Col sm={12} md={3}>
              <div className="Government-form">
                <Card className="table-card mt-3">
                  <Card.Body>
                    <h3 className="table-heading text-center">
                      Transfer Funds
                    </h3>
                    <div className="Government-form-wrapper">
                      <div className="currentFund text-center">
                        <h1>{`${
                          govtWETHBalance !== undefined
                            ? bigNumberToEthers(govtWETHBalance)
                            : "0.0"
                        } WETH`}</h1>
                        <p>Total Funds</p>
                      </div>
                      <form
                        action=""
                        className="d-flex flex-column align-items-center"
                      >
                        <input
                          type="text"
                          placeholder="Enter constituency ID"
                          onChange={(event) => {
                            setConstituencyAddress(event.target.value);
                          }}
                        />
                        <input
                          type="number"
                          placeholder="Amount"
                          onChange={(event) => {
                            setTransferAmount(event.target.value.toString());
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
                          onClick={handleTransferToConstituency}
                          disabled={isTransferLoading}
                        >
                          {isTransferLoading
                            ? "Transcation in process"
                            : "Transfer"}
                        </button>
                      </form>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
          <Row>
            <AddConstituency></AddConstituency>
          </Row>
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default Government;
