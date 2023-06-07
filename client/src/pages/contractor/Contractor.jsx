import React,{useState,useEffect} from "react";
import Navigation from "../../components/navigation/Navbar";
import {
  useSDK,
  useContractRead,
  useContract,
  useAddress,
  useDisconnect,
  useContractWrite,
} from "@thirdweb-dev/react";
import { bigNumberToEthers } from "../../utils/bigNumberToEther";
import { WETHQueryFromDestination } from "../../services/WETHQuery";
import Select from "../../components/Select/index";
import "./contractor.css";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import Footer from "../../components/footer/Footer.jsx";
import Header from "../../components/header/Header.jsx";
import GenerateContract from "../../components/generateContract/GenerateContract.jsx";
import ContractTable from "../../components/Tables/ContractTable.jsx";
import WETHABI from "../../contractsABI/WETH.json";
import CONTRACTORABI from "../../contractsABI/Contractor.json";

const WETH_ADDRESS = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";
const CONTRACTOR_REGISTERY= import.meta.env.VITE_CONTRACTOR_ADDRESS;

function Contractor() {
  const sdk = useSDK();
  const disconnect= useDisconnect();
  const [contractors, setContractors] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState('');
  const [contractorBalance, setContractorBalance] = useState('');
  const [incomingTranscationsList, setIncomingTranscationsList] = useState([]);

  useEffect(()=>{
    getAllRegisteries()
    return disconnect;
  },[])
useEffect(()=>{
  if(!selectedContractor)return;
  getContractorBalance();
  queryContractorIncomingFunds();
},[selectedContractor])
const getAllRegisteries = async ()=>{
  const Contract = await sdk.getContract(CONTRACTOR_REGISTERY,CONTRACTORABI);
  const data = await Contract.call(
    "getAllRegisteries"
  );
  if(data.length>0){
    setContractors(data);
    setSelectedContractor(data[0]);
  }
}
const getContractorBalance = async ()=>{
  const Contract = await sdk.getContract(WETH_ADDRESS,WETHABI);
  const data = await Contract.call(
    "balanceOf",
    [selectedContractor]
  );
    setContractorBalance(bigNumberToEthers(data));
}
const handleChangeContractor = (event)=>{
  setSelectedContractor(event.target.value);
}
const queryContractorIncomingFunds = async ()=>{
  const {data: dstData} = await WETHQueryFromDestination(selectedContractor);
  if(dstData?.transfers?.length > 0){
    setIncomingTranscationsList(dstData?.transfers);
  }
}
  return (
    <div>
      <Navigation></Navigation>
      <Header heading={`Contractor: ${selectedContractor}`}>
      <div className="d-flex justify-content-center align-items-center">

      <Select
      onChange={handleChangeContractor}
    >
          {/* {userConstituencyIsLoading ?<option value={"Searching..."}>{"Searching..."}</option>:constituencyContract?.map((e,index)=>(
          <option value={e} key={index}>{e}</option>
        ))} */}
          {contractors?.map((e, index) => (
            <option value={e} key={index}>
              {e}
            </option>
          ))}
        </Select>
      </div>
      </Header>
      <Container>
        <Row>
          {/* <GenerateContract web3={web3}></GenerateContract> */}
          <h1
          style={{
            marginTop:'1rem',
            textAlign:'center'
          }}
          >Contractor Current Balance: {contractorBalance} WETH</h1>
          <Col md={12}>
            <Card className="table-card">
              <Card.Body>
                <ContractTable tableData={incomingTranscationsList}></ContractTable>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default Contractor;
