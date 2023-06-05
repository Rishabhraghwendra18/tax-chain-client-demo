import React, { useState } from "react";
import { Col, Button, Form, Card } from "react-bootstrap";
import {
  useContractWrite,
  useContractRead,
  useContract,
  useAddress,
  useDisconnect
} from "@thirdweb-dev/react";
import REGISTERYABI from "../../contractsABI/Registery.json";
import "./index.css";
// import GovtDetails from '../../contracts/GovtDetails.json';

const REGISTERY_ADDRESS = import.meta.env.VITE_REGISTERY_ADDRESS;

function AddConstituency(web3) {
  const [name, setName] = useState('');
  const [addr, setAddr] = useState('');
  const {
    contract: registeryContract,
    isLoading: isRegisteryContractLoading,
    error: registeryContractError,
  } = useContract(REGISTERY_ADDRESS, REGISTERYABI);

  const {
    mutateAsync: addNewConstituency,
    isLoading: addNewConstituencyLoading,
    error: addNewConstituencyError,
  } = useContractWrite(registeryContract, "addNewConstituency");

  const handleAddConstituency = async (event)=>{
    event.preventDefault();
    await addNewConstituency({
      args:[name]
    })
  }
  return (
    <Col md={12}>
      <Card className="constituency-card  constituency-form-card">
        <Form className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Constituency Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Form.Group>

          {/* <Form.Group>
            <Form.Control
              type="text"
              placeholder="Constituency Address"
              onChange={(event) => {
                // setAddr(event.target.value);
              }}
            />
          </Form.Group> */}
          <button
            className="constituency-form-button-green"
            type="submit"
            onClick={handleAddConstituency}
          >
            Add Constituency
          </button>
        </Form>
      </Card>
    </Col>
  );
}

export default AddConstituency;
