import React,{useState,useEffect} from "react";
import { useContractWrite, useContractRead, useContract,useAddress } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { ethers } from "ethers";
import { gql,cacheExchange, createClient, dedupExchange, fetchExchange } from "urql";
import Navigation from "../../components/navigation/Navbar";
import Header from "../../components/header/Header";
import {
  Row,
  Col,
  // Button,
  Form,
  Card,
  Container,
  Alert,
  Table,
} from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import CitizenTable from "../../components/Tables/CitizenTable.jsx";
import GovernmentTable from "../../components/Tables/GovernmentTable.jsx";
import CurrentTokens from "../../components/currentTokens/CurrentTokens";
import PurchaseTokens from "../../components/purchaseTokens/PurchaseTokens";
import Button from "../../components/button";
import WETHABI from "../../contractsABI/WETH.json";
// import Transact from "../../contracts/Transact.json";
import "./citizen.css";

const WETH_ADDRESS = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
const GOVT_ADDRESS ='0x2523886B04731Ce03AeCcad82062efba81CAcC07';
export default function Citizen() {
  const address = useAddress();
  const [transcationsList, setTranscationsList] = useState([]);
  const [isTxnLoading, setIsTxnLoading] = useState(false);
  const client = createClient({
    url: 'https://api.studio.thegraph.com/query/47824/weth-sepolia/version/latest',
    exchanges: [dedupExchange, cacheExchange, fetchExchange]
  });
  const { contract:WETHContract,isLoading: isContractLoading, error:contractError } = useContract(WETH_ADDRESS,WETHABI);
  const { mutateAsync:WETHContractDepositMutateAsync, isLoading:WETHContractDepositIsLoading, error:WETHContractDepositError } = useContractWrite(
    WETHContract,
    "deposit",
  );
  const { mutateAsync:WETHContractTransferMutateAsync, isLoading:WETHContractTransferIsLoading, error:WETHContractTransferError } = useContractWrite(
    WETHContract,
    "transfer",
  );
  
  const { data:userWETHBalance, isLoading, error } = useContractRead(
    WETHContract,
    "balanceOf",
    [address],
  );
  useEffect(()=>{
    if(!address) return;
    (async ()=>{
      const query = gql`
      {
        transfers(
          where: {dst: "${GOVT_ADDRESS}", src: "${address}"}
        ) {
          transactionHash
          wad
          blockTimestamp
        }
      }`
      const {data} = await client.query(query).toPromise();
      setTranscationsList(data.transfers);
      console.log("data: ",data.transfers);
    })()
  },[address])

  const convertETHToWETH = async () =>{
    await WETHContractDepositMutateAsync({
      overrides:{
        value: ethers.utils.parseEther("0.1"),
      },
    })
  }
  const transferWETHToGovtContract = async () =>{
   await WETHContractTransferMutateAsync({
      args:[GOVT_ADDRESS,ethers.utils.parseEther("0.1")],
    })
  }

  const handlePayTax = async (event) =>{
    event.preventDefault();
    setIsTxnLoading(true);
    if(userWETHBalance < ethers.utils.parseEther("0.1")){
      await convertETHToWETH();
    }
    await transferWETHToGovtContract();
    setIsTxnLoading(false);
  }
  return (
    <div className="">
      <Navigation></Navigation>
      <Header heading="Citizen: Rohan Singh"></Header>
      <Container>
        <Row>
          <PurchaseTokens purhcaseTokens={convertETHToWETH}></PurchaseTokens>
          <CurrentTokens name="Current Balance" value="2392138"></CurrentTokens>
        </Row>
      </Container>
      <div className="PayTax my-5">
        <Row>
          <Col sx={12} md={8} id="table">
            <div className="payTax-table">
              <CitizenTable tableData={transcationsList}></CitizenTable>
            </div>
          </Col>
          <Col sx={12} md={4}>
            <div>
              <Card className="table-card">
                <Card.Body>
                  <h2>Pay Tax</h2>
                  {/* {isTxnLoading ? (
                    <Alert variant="success" className="mb-5">
                      {"Transaction complete"}
                    </Alert>
                  ) : (
                    "Transcation in process"
                  )} */}
                  <Form className="d-flex flex-column">
                    <Form>
                      <Form.Group as={Col}>
                        <Form.Control type="number" placeholder="Amount" value={0.1}/>
                      </Form.Group>
                    </Form>
                    <Button
                      type="submit"
                      className="constituency-find-btn"
                      onClick={handlePayTax}
                      style={{width:'fit-content',padding:5}}
                      disabled={isTxnLoading}
                    >
                      {isTxnLoading ? "Transcation in Process":"Submit"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Col>
          {/* <Col className="mt-5">
            <GovernmentTable
              heading={"Track You Tax"}
              tableData={transcationsList}
            ></GovernmentTable>
          </Col> */}
        </Row>
      </div>
      <Footer></Footer>
    </div>
  );
}

// export default Citizen;
