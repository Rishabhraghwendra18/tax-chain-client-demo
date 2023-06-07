import React,{useEffect, useState} from "react";
import { useSDK, useContractRead, useContract,useAddress,useDisconnect,useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Row, Col,Form,Button, Card, Container } from "react-bootstrap";
import Select from "../../components/Select";
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
import CONTRACTORABI from "../../contractsABI/Contractor.json";

const WETH_ADDRESS = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
const REGISTERY_ADDRESS = import.meta.env.VITE_REGISTERY_ADDRESS;
const CONTRACTOR_REGISTERY= import.meta.env.VITE_CONTRACTOR_ADDRESS;

function Constituency() {
  const sdk = useSDK();
  const disconnect = useDisconnect();
  const [contractorName, setContractorName] = useState('');
  const [description, setDescription] = useState('');
  const [isTransferLoading, setIsTransferLoading] = useState(false);
  const [transcationList, setTranscationList] = useState([]);
  const [constituencyWETHBalance, setConstituencyWETHBalance] = useState('');
  const [constituencyUsedFunds, setConstituencyUsedFunds] = useState('');
  const [constituencies, setConstituencies] = useState([]);
  const [selectedContituency, setSelectedContituency] = useState();
  const { contract:contractorContract,isLoading: isContractorContractLoading, error:ContractorError } = useContract(CONTRACTOR_REGISTERY,CONTRACTORABI);
  const {mutateAsync:contractorCreate,isLoading:contractorCreateLoading,error:contractorCreateError} = useContractWrite(
    contractorContract,
    "addNewContractor"
  );

  useEffect(()=>{
    if(!selectedContituency) return;
    getConstituencyTransfers();
    getConstituencyBalance();
  },[selectedContituency]);

  useEffect(()=>{
    getAllRegisteries();  
    return disconnect;
  },[]);

  const getAllRegisteries = async ()=>{
    const Contract = await sdk.getContract(REGISTERY_ADDRESS,REGISTERYABI);
    const data = await Contract.call(
      "getAllRegisteries"
    );
    if(data?.length > 0){
      setConstituencies(data);
      setSelectedContituency(data[0]);
    }
  }
  const getConstituencyBalance = async ()=>{
    const Contract = await sdk.getContract(WETH_ADDRESS,WETHABI);
    const data = await Contract.call(
      "balanceOf",
      [selectedContituency]
    );
    setConstituencyWETHBalance(bigNumberToEthers(data));
    
    const ConstituencyContract = await sdk.getContract(selectedContituency,CONSTITUENCYABI);
    const usedFunds = await ConstituencyContract.call(
      "usedFunds"
    );
    setConstituencyUsedFunds(bigNumberToEthers(usedFunds));
  }
  const getConstituencyTransfers = async () =>{
    const {data}=await WETHQueryFromSource(selectedContituency);
    setTranscationList(data.transfers);
  }
  const handleCreateContractor = async (event)=>{
    event.preventDefault();
    await contractorCreate({
      args:[contractorName,'description']
    });
  }
  const handleChangeConstituency = (event)=>{
    setSelectedContituency(event.target.value);
  }
  return (
    <div>
      <Navigation></Navigation>
      <Header heading={`Constituency Address: ${selectedContituency}`}>
        <div
        className="d-flex justify-content-center align-items-center"
        >
      <Select
      placeholder={"Choose Constituency"}
      styles={{
        // width:'fit-content'
      }}
      disabled={false}
      onChange={handleChangeConstituency}
      >
        {/* {userConstituencyIsLoading ?<option value={"Searching..."}>{"Searching..."}</option>:constituencyContract?.map((e,index)=>(
          <option value={e} key={index}>{e}</option>
        ))} */}
        {constituencies?.map((e,index)=>(
          <option value={e} key={index}>{e}</option>
        ))}
      </Select>
        </div>
      </Header>
      <Container className="my-5">
        <Row>
          <Fund name="Alloted Funds" value={`${constituencyWETHBalance!==undefined ? constituencyWETHBalance:'0.0'} WETH`}></Fund>
          <Fund name="Used Funds" value={`${constituencyUsedFunds!== undefined ? constituencyUsedFunds:'0.0'} WETH`}></Fund>
        </Row>
        <Row>
          <TransferFunds onSuccess={getConstituencyTransfers} userConstituency={selectedContituency}></TransferFunds>
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
                      placeholder="Contractor Name"
                      onChange={(v) => {
                        setContractorName(v.target.value);
                      }}
                    />
                  </Form.Group>
                  {/* <Form.Group as={Col}>
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      onChange={(v) => {
                        setDescription(v.target.value);
                      }}
                    />
                  </Form.Group> */}
                <button
                  type="submit"
                  className="constituency-find-btn"
                  onClick={handleCreateContractor}
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
