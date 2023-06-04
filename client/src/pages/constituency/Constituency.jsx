import React,{useState} from "react";
import { useContractWrite, useContractRead, useContract,useAddress } from "@thirdweb-dev/react";
import { Row, Col, Button, Form, Card, Container } from "react-bootstrap";
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

const WETH_ADDRESS = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
const CONSTITUENCY_ADDRESS= '0x089AC0B06277915174e57DbDF361B026D77209F6';

function Constituency() {
  const address = useAddress();
  const [isTransferLoading, setIsTransferLoading] = useState(false);
  const { contract:WETHContract,isLoading: isContractLoading, error:contractError } = useContract(WETH_ADDRESS,WETHABI);
  const { contract:constituencyContract,isLoading: isCConstituencyContractLoading, error:constituencyContractError } = useContract(CONSTITUENCY_ADDRESS,CONSTITUENCYABI);
  
  const { data:constituencyWETHBalance, isLoading, error } = useContractRead(
    WETHContract,
    "balanceOf",
    [CONSTITUENCY_ADDRESS]
  );
  const {data:constituencyUsedWETHAmount,isLoading:constituencyUsedWETHLoading,error:constituencyUsedWETHError} = useContractRead(
    constituencyContract,
    "usedFunds"
  );

  return (
    <div>
      <Navigation></Navigation>
      <Header heading="Malviya Nagar Constituency"></Header>
      <Container className="my-5">
        <Row>
          <Fund name="Alloted Funds" value={`${constituencyWETHBalance!==undefined ? bigNumberToEthers(constituencyWETHBalance):'0.0'} WETH`}></Fund>
          <Fund name="Used Funds" value={`${constituencyUsedWETHAmount!== undefined ? bigNumberToEthers(constituencyUsedWETHAmount):'0.0'} WETH`}></Fund>
        </Row>
        <Row>
          <TransferFunds></TransferFunds>
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
            tableHeaders={["ContractId", "Amount"]}
            tableData={[]}
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
