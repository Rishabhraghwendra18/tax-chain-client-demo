import React from "react";
import { ConnectWallet,useAddress } from "@thirdweb-dev/react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { useAuth } from "../../pages/contexts/AuthContext";

function Navigation() {
  const address = useAddress();
  // const { currentUser, signout } = useAuth();
  function isGovernment() {
    return true;
  }
  function isConstituency() {
    return true;
  }
  function isContractor() {
    return true;
  }
  function isCitizen() {
    return true;
  }
  return (
    <Navbar className="color-nav fixed-top" variant="dark" expand="lg">
      <Navbar.Brand href="/" className="navbar_brand">
        <FontAwesomeIcon className="icon" icon={faDiceD20} />
        TaxChain
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="navlink_container">
        {address && (
        <Nav className="mr-auto ml-auto">
          {isCitizen() ? (
            <Link className="nav-link" to="/citizen">
              Citizens
            </Link>
          ) : (
            ""
          )}

          {isGovernment ? (
            <Link className="nav-link" to="/government">
              Government
            </Link>
          ) : (
            ""
          )}

          {isConstituency ? (
            <Link className="nav-link" to="/constituency">
              Constituency
            </Link>
          ) : (
            ""
          )}

          {isContractor ? (
            <Link className="nav-link" to="/contractor">
              Contractor
            </Link>
          ) : (
            ""
          )}
        </Nav>
        )}
        {/* <Nav.Link className="nav-link" href={`/${currentUser ? "" : "login"}`}>
          <Button
            variant="outline"
            className="btn-green"
            onClick={currentUser ? signout : () => {}}
          >
            {currentUser ? "Logout" : "Login"}
          </Button>
        </Nav.Link>
        {!currentUser ? (
          <Nav.Link className="nav-link navbar-signup" href="/signup">
            SignUp
          </Nav.Link>
        ) : (
          ""
        )} */}
      </Navbar.Collapse>
        <ConnectWallet
          dropdownPosition={{
            align: "center",
            side: "bottom",
          }}
          className="btn-green"
          style={{
            marginLeft: "auto",
            marginRight: "1rem",
          }}
        />
    </Navbar>
  );
}

export default Navigation;
