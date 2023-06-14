import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp91,
  faDollarSign,
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Headers/Header";
import { listassociation } from "../../network/ApiAssociation";
import Swal from "sweetalert2";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { donation_association } from "../../network/ApiAssociation";

import { Card, Container, Row, Col } from "reactstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import {
  FormGroup,
  Form,
  CardHeader,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Label,
} from "reactstrap";

import Button from "react-bootstrap/Button";
import { color } from "@amcharts/amcharts5";

const ListAssociation = () => {
  const nbr_point = JSON.parse(localStorage.getItem("employeeInfo")).nbr_point;
  const nomE = JSON.parse(localStorage.getItem("employeeInfo")).nom;
  const prenomE = JSON.parse(localStorage.getItem("employeeInfo")).prenom;
  const id_e = JSON.parse(localStorage.getItem("employeeInfo")).id_e;
  const id_r = JSON.parse(localStorage.getItem("employeeInfo")).id_r;
  const solde_argent = JSON.parse(
    localStorage.getItem("employeeInfo")
  ).solde_argent;

  const [valueOption, setvalueOption] = useState("solde");
  const [solde, setsolde] = useState(0);
  const [Fpoint, setFpoint] = useState(0);

  const [associationinfo, setassociationinfo] = useState(null);

  const handleChange = (e) => {
    // console.log("value 2 "+JSON.stringify(e));
    setvalueOption(e.target.value);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const [modal, setModal] = useState(false);
  const changeMoney = (id_e,typetransaction, id_r, id_a, nomE, prenomE) => {
    console.log("type transaction ",typetransaction)
    if (Fpoint == 0 && valueOption == "point") {
      setErrorMessage("point must be not null");
    } else if (Fpoint > nbr_point && valueOption == "point") {
      setErrorMessage("you dont have this solde on your account ");
    } else if (solde == 0 && valueOption == "solde") {
      setErrorMessage("Balance not zero");
    } else if (solde > solde_argent && valueOption == "solde") {
      setErrorMessage("Insufficient balance ");
    } else if (valueOption == "solde") {
      var montant = solde;
      console.log("solde//////////", montant);
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.value == true) {
          Swal.fire("Changing money  are  saved", "", "info");
          console.log(" point " + Fpoint + " solde " + solde);

          console.log(
            id_e +
              "\t montant " +
              montant +
              "\t id a  " +
              id_a +
              "id r" +
              id_r +
              " nome " +
              nomE +
              " prenom " +
              prenomE
          );
          const response = donation_association(
            id_e,
            solde,
            typetransaction,
            id_a,
            id_r,
            nomE,
            prenomE
          );

          // console.log("responce  infooo ",response)

          setsolde(0);
          // setFpoint(0);
          setModal(!modal);
        } else {
          console.log("**************** not confirmed ");
          Swal.fire("Changes are not saved", "", "info");
          setsolde(0);
          setModal(!modal);
        }
      });
    } else {
      var montant = Fpoint / 10;
      console.log("fpoint //////////", montant);
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.value == true) {
          Swal.fire("Changing money  are  saved", "", "info");
          console.log(
            id_e +
              "\t montant " +
              solde +
              "\t id a  " +
              id_a +
              "id r" +
              id_r +
              " nome " +
              nomE +
              " prenom " +
              prenomE
          );
          const response = donation_association(
            id_e,
            montant,
            id_a,
            id_r,
            nomE,
            prenomE
          );

          // console.log("responce  infooo ",response)

          setFpoint(0);
          setModal(!modal);
        } else {
          console.log("**************** not confirmed ");
          Swal.fire("Changes are not saved", "", "info");
          setFpoint(0);
          setModal(!modal);
        }
      });
    }
  };

  const toggle = () => {
    setFpoint(0);
    setErrorMessage("");
    setModal(!modal);
  };

  const [allassociation, setallassociation] = useState([]);
  useEffect(() => {
    const runAsync = async () => {
      const response = await listassociation();
      const { data } = response;
      console.log(
        "data**************************************************",
        data
      );
      setallassociation(data);

      console.log("///////////////data", allassociation);

      // if (data.success) {
      //   setactiveemployee(data.data);
      //   console.log(
      //     "data success///////////////////////////////////",
      //     activeemployee
      //   );
      // }
    };
    runAsync();
  }, []);
  return (
    <>
      <Header />
      {/* <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0"> */}
      {/* Page content */}
      <Container className="mt--7" fluid>
      
            <div className="col">
              <Card className="shadow border-0" style={{paddingLeft:"10px",paddingRight:"10px"}}>
                 <CardHeader className="border-0">
                <h3 className="mb-0" >List of Association </h3>
              </CardHeader>
      <Row >
          {allassociation.map((assocation) => (
            
              <Col xs="12" md="6" >
                <MDBCard className="border rounded-3 mt-2 mb-3" style={{height:"200px"}}>
                  <MDBCardBody>
                    
                    <MDBRow  >
                      <MDBCol  className="mb-4 mb-lg-0">
                        <MDBRipple
                          rippleColor="light"
                          rippleTag="div"
                          className="bg-image rounded hover-zoom hover-overlay"
                        >
                          <MDBCardImage
                            src="https://th.bing.com/th/id/OIP.jUtUuMUVsL448KM1egQNMQAAAA?pid=ImgDet&rs=1"
                            fluid
                            className="w-100"
                          />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.15)",
                              }}
                            ></div>
                          </a>
                        </MDBRipple>
                      </MDBCol>
                      <MDBCol md="6">
                        <h5>{assocation.desgination}</h5>

                        <div className="mt-1  mb-0  small">
                          <span>
                            Description:
                            <br />
                          </span>
                        </div>
                        <div className="mb-2  small">
                          <p className="mb-1 text-muted small" style={{overflow:"hidden"}}> {assocation.description} </p>
                          <div className="mt-2">
                            <span>
                              {" "}
                              <FontAwesomeIcon icon={faLocationDot} />{" "}
                              {assocation.adresse} <br />
                            </span>

                            <span>
                              <FontAwesomeIcon icon={faPhone} />{" "}
                              {assocation.Tel}
                              <br />
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faEnvelope} />{" "}
                              {assocation.email}
                              <br />
                            </span>
                          </div>
                        </div>
                        {/* <p className="text-truncate mb-4 mb-md-0">
          
                         </p> */}
                      </MDBCol>
                      <MDBCol className="border-sm-start-none border-start">
                        <div className="d-flex flex-row align-items-center mb-1">
                          {/* <h4 className="mb-1 me-1">$13.99</h4> */}
                          {/* <span className="text-danger">
                            <s>$20.99</s>
                          </span> */}
                        </div>
                        {/* <h6 className="text-success">Free shipping</h6> */}
                        <div>
                          <Button
                            outline
                            color="primary"
                            size="sm"
                            className="mt-2"
                            onClick={() => {
                              toggle();
                              setassociationinfo(assocation);

                              console.log(
                                "///////////////association ",
                                associationinfo
                              );
                            }}
                          >
                            Donation
                          </Button>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </Col>
            
          ))}
          </Row>
       
        <Col>
          <Modal isOpen={modal} fade={false} toggle={toggle}>
            <ModalHeader toggle={toggle} style={{backgroundColor:"blue" ,height:"70px"}}>
              <span>
                  <img
                              style={{ width: "60px",height:"50px",borderRadius:"70%",marginTop:"-10px" }}
                              src="https://thumbs.dreamstime.com/b/donnez-l-argent-et-le-concept-de-charit-la-main-est-mise-des-billets-banque-dans-une-bo%C3%AEte-donation-illustration-vecteur-cran-144203412.jpg"
                            ></img>
             <span style={{color:"white",marginLeft:"5px",fontSize:"15px"}}> <b> Donation Box</b> </span>  
              </span>
            </ModalHeader>
            <ModalBody>
              {/* <h3 style={{ marginTop: "-30px" }}>
                {" "}
                Welcome to the donation box !{" "}
              </h3> */}
              <h3 style={{ textAlign:"center",fontSize: "20px", fontWeight:"600"}} >👋 Welcome to the DonationBox!</h3>
             
              <div>
                <Form role="form">
                  <FormGroup>
                    <FormControl>
                      
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="solde"
                        name="radio-buttons-group"
                      >
                        <Row className="my-4">
                          <Col>
                            {/* <img
                              style={{ width: "300px" }}
                              src="https://thumbs.dreamstime.com/b/donnez-l-argent-et-le-concept-de-charit-la-main-est-mise-des-billets-banque-dans-une-bo%C3%AEte-donation-illustration-vecteur-cran-144203412.jpg"
                            ></img> */}
                          </Col>
                          <Col xs="12"  >
                          <label style={{ marginTop:" px",fontWeight: "500"}} >donation method : </label> <br/>
                            <FormControlLabel style={{marginLeft:"20px" ,color:"black"}}
                              value="solde"
                              control={<Radio />}
                              onChange={handleChange}
                              label="Donate Cash"
                            />
                            <FormControlLabel
                              value="point"
                              control={<Radio />}
                              onChange={handleChange}
                              label="Donate Points"
                            />
                             {valueOption == "point" && (
                         
                            <form>
                               <label style={{ marginTop:" px",fontWeight: "500"}} >Enter Donation Amount (ETH) :</label>
          <input style={{ width: "100%",border: "1px solid black", borderRadius: "5px", height: "15px",padding:" 15px",marginTop:"10px"}}
            required
            placeholder="Nbr points"
                                type="number"
                                onChange={(e) => {
                                  e.preventDefault();
                                  setFpoint(e.target.value);
                                  setErrorMessage("");}}
          />
                            </form>
                          )}

                          {valueOption == "solde" && (
                            
                            // <InputGroup className="input-group-alternative">
                              
                            //   <InputGroupAddon addonType="prepend">
                            //     <InputGroupText>
                            //       <FontAwesomeIcon icon={faDollarSign} />
                            //     </InputGroupText>
                            //   </InputGroupAddon>
                            //   <Input
                            //     placeholder="solde"
                            //     type="number"
                            //     onChange={(e) => {
                            //       e.preventDefault();
                            //       setsolde(e.target.value);

                            //       setErrorMessage("");
                            //     }}
                            //   />
                            // </InputGroup>
                            <form>
                            <label style={{ marginTop:" px",fontWeight: "500"}} >Enter Donation Amount (ETH) :</label>
                            <input style={{ width: "100%",border: "1px solid black", borderRadius: "5px", height: "15px",padding:" 15px",marginTop:"10px"}}
                              required
                              placeholder="Solde"
                             type="number"
                                 onChange={(e) => {
                                  e.preventDefault();
                                  setsolde(e.target.value);

                                  setErrorMessage("");
                                }}
                                />
                             </form>
                          )}
                          {errorMessage || Fpoint == 0 || Fpoint > nbr_point ? (
                            <div className="text-muted font-italic">
                              <small>
                                <span className="text-red font-weight-700">
                                  {errorMessage}
                                </span>
                              </small>
                            </div>
                          ) : (
                            ""
                          )}
                          </Col>
                        </Row>
                        <Col
                          // style={{
                          //   width: "200px",
                          //   marginLeft: "200px",
                          //   marginTop: "-20px",
                          // }}
                        >
                         

                         
                        </Col>
                      </RadioGroup>
                    </FormControl>

                    {/* <Row>
                      {errorMessage || Fpoint == 0 || Fpoint > nbr_point ? (
                        <div className="text-muted font-italic">
                          <small>
                            <span className="text-red font-weight-700">
                              {errorMessage}
                            </span>
                          </small>
                        </div>
                      ) : (
                        ""
                      )}
                    </Row> */}
                  </FormGroup>
                </Form>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  changeMoney(id_e,valueOption, id_r, associationinfo.id_a, nomE, prenomE);
                }}
              >
                Donate
              </Button>{" "}
              <Button color="secondary"  onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
        </Card>
        </div>
        
      </Container>
    </>
  );
};
export default ListAssociation;
