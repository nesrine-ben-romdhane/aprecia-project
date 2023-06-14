import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Textarea from '@mui/joy/Textarea';
import FormControl from "@mui/material/FormControl";
import money from "../../assets/img/brand/monyyy.png";
import donate from "../../assets/img/brand/donate.png";
import giftcard from "../../assets/img/brand/gift.jpg";
import { changeMoneyEmployee } from "../../network/ApiEmployee";
import { cartecadeaux } from "../../network/ApiEmployee";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useHistory } from "react-router-dom";


import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
  Container
} from "reactstrap";

// reactstrap components

import {

  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

import Swal from "sweetalert2";

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Header from "../../components/Headers/Header";
const Changeawrads = () => {
  const [pointcard, setpointcard] = useState(0);
  const [description, setdescription] = useState("")
  const [modal, setModal] = useState(false);
  const [modalfidelety, setmodalfidelety] = useState(false);
  const [errorradio, setErrorradio] = useState("");
  const [errornombremax, setErrornombremax] = useState("");
  const [errordesc, setErrordec] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stateSubmit, setStateSubmit] = useState(false);
  // const [topRightModal, setTopRightModal] = useState(false);
  const [centredModal, setCentredModal] = useState(false);
  // const toggleShow = () => setCentredModal(!centredModal);
  const [Fpoint, setFpoint] = useState(0);
  const nomE = JSON.parse(localStorage.getItem("employeeInfo")).nom
  const prenomE = JSON.parse(localStorage.getItem("employeeInfo")).prenom
  const id_r = JSON.parse(localStorage.getItem("employeeInfo")).id_r;
  const id_e = JSON.parse(localStorage.getItem("employeeInfo")).id_e;
  const nbr_point = JSON.parse(localStorage.getItem("employeeInfo")).nbr_point;
  const [typecarte, settypecarte] = useState("")
  



  const changeMoney = (id_r, id_e, Fpoint, nomE, prenomE, e) => {
    // const handletype = (e) => {
    //   // console.log("value 2 "+JSON.stringify(e));
    //   settypecarte(e.target.value);
    // };


    if (Fpoint == 0) {

      setErrorMessage("point must be not null");

    }
    else if (Fpoint > nbr_point) {

      setErrorMessage("you dont have this solde on your account ");
    }
    else {


      console.log("nom      " + nomE + "prenom   " + prenomE + "Fpoint     " + Fpoint + "id_e     " + id_e + "id_r    " + id_r + "stateSubmit" + stateSubmit);
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {

        if (result.value == true) {
          const response = changeMoneyEmployee(id_r, id_e, Fpoint, nomE, prenomE)
          Swal.fire('Changing money  are  saved', '', 'info');
          setFpoint(0);
          setModal(!modal);

        }

        else {
          console.log("**************** not confirmed ");
          Swal.fire('Changes are not saved', '', 'info');
          setFpoint(0);
          setModal(!modal);


        }

      })
    }


  }
  const toggle = () => {
    setFpoint(0);
    setErrorMessage("");
    setModal(!modal);

  }
 
  ///////////////////////////////////////////////////////////////////
  const togglefidelity = () => {
    setFpoint(0);
    setErrorMessage("");
    setmodalfidelety(!modalfidelety);
    
  }
  const changetocard =( id_r,id_e,typeoperation,nbr_point,desc,nomE,prenomE) =>{
    console.log("////info carte",id_r,id_e,typeoperation,nbr_point,desc,nomE,prenomE)
    if(typecarte==""){
      setErrorradio("Checked the card type")
    }
    else if (nbr_point<1500 && typeoperation=="carte voyage"){
      setErrornombremax("Insufficient number of points for travel card")
      setErrordec("")
      setErrorradio("")
    }
    else if (nbr_point < 300 && typeoperation=="carte_resto" ){
      setErrornombremax("Insufficient number of points for Restaurant card")
    }
    else if (nbr_point ==0){
      setErrornombremax("Give the number of points")
    }
    if(desc ==""){
      
      setErrordec("Give a description")
      console.log("************** erro descriiption "+errordesc)

    }
    else{
      console.log(id_r,id_e,typeoperation,nbr_point,desc,nomE,prenomE);
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {

        if (result.value == true) {
          const response = cartecadeaux(id_r,id_e,typeoperation,nbr_point,desc,nomE,prenomE)
          console.log(response)
          Swal.fire('Changing card are  saved', '', 'info');
          setpointcard(0);
          setmodalfidelety(!modalfidelety)

        }

        else {
          console.log("**************** not confirmed ");
          Swal.fire('Changes are not saved', '', 'info');
          setpointcard(0);
          setmodalfidelety(!modalfidelety)


        }

      })
    }
   
  }
 const changeStateCard=(e)=>{
  settypecarte(e.target.value);
  console.log(typecarte)
 }
 
  // const toggleShow = () => setTopRightModal(!topRightModal);
  const history = useHistory();
  ///////////////////////////////////////////////////////////////

 
  return (
    <>
      <Header />

      <Container className="mt--7" fluid>


        <Row>
          <div className="col">
            <Card className=" border-0" >
              <h2 style={{ marginLeft: "50px", marginTop: "50px" }}>This Interface used for three principales feautures : </h2>
              <div style={{ margin: "auto", marginTop: "50px", marginBottom: "100px" }}>
                <MDBRow className="row-cols-1 row-cols-md-3 g-4 ">
                  <MDBCol >
                    <MDBCard className="shadow " style={{ width: "250px", }}>
                      <MDBCardImage
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          margin: "auto",
                          marginTop: "20px",

                        }}
                        src={money}
                        alt="..."
                        position="top"
                      />
                      <MDBCardBody>
                        <MDBCardTitle>Changing point to money</MDBCardTitle>
                        <MDBCardText>
                          This is a longer card with supporting text below as a
                          natural lead-in to additional content.

                        </MDBCardText>
                        <Button size="sm" className="bg-primary text-white" onClick={() => { toggle() }}>Changing</Button>
                      </MDBCardBody>
                    </MDBCard>

                    <Col>
                      <Modal isOpen={modal} fade={false} toggle={toggle}>
                        <ModalHeader toggle={toggle} style={{ backgroundColor: "blue", height: "70px" }}>
                          <span>
                            <img
                              style={{ width: "60px", height: "50px", borderRadius: "70%", marginTop: "-10px" }}
                              src="https://img.freepik.com/free-vector/currency-exchange-service-monetary-transfer-changing-dollar-euro-buying-selling-foreign-money-golden-coins-with-eu-us-currency-symbols-vector-isolated-concept-metaphor-illustration_335657-2818.jpg"
                            ></img>
                            <span style={{ color: "white", marginLeft: "5px", fontSize: "15px" }}> <b> Changing Box</b> </span>
                          </span>
                        </ModalHeader>
                        <ModalBody>
                          {/* <h3 style={{ marginTop: "-30px" }}>
                {" "}
                Welcome to the donation box !{" "}
              </h3> */}
                          <h3 style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }} >👋 Welcome to the Changing Box!</h3>

                          <div>
                            <Form role="form">
                              <FormGroup>

                                <Row className="my-4">

                                  <Col xs="12"  >


                                    <form>
                                      <label style={{ marginTop: " px", fontWeight: "500" }} >Enter Your Amount (ETH) :</label>
                                      <input style={{ width: "100%", border: "1px solid black", borderRadius: "5px", height: "15px", padding: " 15px", marginTop: "10px" }}
                                        required
                                        placeholder="Nbr points"
                                        type="number"
                                        onChange={(e) => {
                                          e.preventDefault();
                                          setFpoint(e.target.value);
                                          setErrorMessage("");
                                        }}

                                      />
                                    </form>


                                  </Col>
                                </Row>
                                <Row>
                                  {errorMessage || Fpoint == 0 || Fpoint > nbr_point && stateSubmit ?
                                    <div className="text-muted font-italic">
                                      <small>
                                        <span className="text-red font-weight-700">{errorMessage}</span>
                                      </small>
                                    </div> : ""}
                                </Row>
                                <Col
                                // style={{
                                //   width: "200px",
                                //   marginLeft: "200px",
                                //   marginTop: "-20px",
                                // }}
                                >



                                </Col>



                              </FormGroup>
                            </Form>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="primary"

                            onClick={() => { changeMoney(id_r, id_e, Fpoint, nomE, prenomE) }}>

                            Change
                          </Button>{" "}
                          <Button color="secondary" onClick={toggle}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </Col>


                  </MDBCol>


                  <MDBCol >
                    <MDBCard className="shadow " style={{ width: "250px", }}>
                      <MDBCardImage
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          margin: "auto",
                          marginTop: "20px",


                        }}
                        src={donate}
                        alt="..."
                        position="top"
                      />
                      <MDBCardBody>
                        <MDBCardTitle>donnation for organisation</MDBCardTitle>
                        <MDBCardText>
                          This is a longer card with supporting text below as a
                          natural lead-in to additional content.
                        </MDBCardText>
                        <Button size="sm" className="bg-primary text-white" onClick={() => history.push("/admin/donation")}>donnation</Button>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>







                  <MDBCol >
                    <MDBCard className="shadow " style={{ width: "250px", }}>
                      <MDBCardImage
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          margin: "auto",
                          marginTop: "20px"
                        }}
                        src={giftcard}
                        alt="..."
                        position="top"
                      />
                      <MDBCardBody>
                        <MDBCardTitle>fidelety card </MDBCardTitle>
                        <MDBCardText>
                          This is a longer card with supporting text below as a
                          natural lead-in to additional content.
                        </MDBCardText>
                        <Button size="sm" className="bg-primary text-white" onClick={()=>{togglefidelity()}} >fidelety</Button>

                      </MDBCardBody>
                    </MDBCard>
                    






                    {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

                    <Col>
          <Modal isOpen={modalfidelety} fade={false} toggle={togglefidelity}>
            <ModalHeader toggle={togglefidelity}  >
              <span>
                  {/* <img
                              style={{ width: "60px",height:"50px",borderRadius:"70%",marginTop:"-10px" }}
                              src="https://img.freepik.com/free-vector/currency-exchange-service-monetary-transfer-changing-dollar-euro-buying-selling-foreign-money-golden-coins-with-eu-us-currency-symbols-vector-isolated-concept-metaphor-illustration_335657-2818.jpg"
                            ></img> */}
             <span style={{marginLeft:"5px",fontSize:"15px"}}>  Fidelity Card</span>  
              </span>
            </ModalHeader>
            <ModalBody>
              {/* <h3 style={{ marginTop: "-30px" }}>
                {" "}
                Welcome to the donation box !{" "}
              </h3> */}
              {/* <h3 style={{ textAlign:"center",fontSize: "20px", fontWeight:"600"}} >👋 Welcome to the Changing Box!</h3> */}
             
              <div className="shadow"  style={{border: "2px solid Chocolate", marginTop:"50px",borderRadius: "10px"}}>
                 {/* <Row> */}
                  {/* <col>  */}
                  <img
                              style={{ width: "350px",height:"200px",marginTop:"-100px",marginLeft:"50px"}}
                              src="https://iambooksboston.com/wp-content/uploads/2020/08/319262_gift-card-png_964x.png"
                            ></img>
                  {/* </col>
                  <col> */}
                
                <Form role="form"  style={{ whidth:"300px",borderRadius: "5px",padding:" 15px",marginLeft:"80px",marginTop:"-50px"}}>
                  
                    
                        <Row className="my-4">
                          
                          <Col xs="12"  >
                          <label style={{ marginTop:" px",fontWeight: "500"}} >Type of card: </label><br/>
                            {/* <FormControlLabel style={{marginLeft:"20px" ,color:"black"}}
                              value="carte voyage"
                              control={<Radio />}
                              onChange={(e)=>{
                                e.settypecarte(e.target.value)
                                
                              }}
                              label="Travel Card"
                            /> */}
                            {/* <FormControlLabel
                              value="carte_resto"
                              control={<Radio />}
                              onChange={(e)=>{
                                e.settypecarte(e.target.value)
                                console.log("//////",typecarte)
                              }}
                              label="restaurant card"
                            /> */}
                            <label>
                            <input type="radio" value="carte_resto" name="type" style={{marginLeft:"10px",marginRight:"10px",color:"black"}}  onChange={(e)=>{
                              changeStateCard(e)
                              }}/>
                            Restaurant card</label>
                      
                            <label>
                            <input type="radio" value="carte voyage" name="type" style={{marginLeft:"20px" ,marginRight:"10px",color:"black",border: "1px solid"}} onChange={(e)=>{
                              changeStateCard(e)}}/>
                            Travel Card</label>
                            <Row>


                                       { errorradio?
                            <div className="text-muted font-italic">
                                <small>
                              <span className="text-red font-weight-700">{errorradio}</span>
                                </small>
                            </div> :"" }
                            </Row>


                              <label style={{ marginTop:" px",fontWeight: "500"}} 
                              >The number of points :</label>
                              <input  required
                                placeholder="Number of points"
                                                    type="number"
                                                    onChange={(e) => {
                                                    
                                  setpointcard(e.target.value);
                                  console.log("/////////nombre de point pour fidelety",pointcard)
                                  setErrornombremax("");}}
                                  style={{ width: "250px",borderRadius: "5px",border: "2px solid LightGrey", height: "15px",padding:" 15px",marginTop:"10px",marginBottom:"10px",marginLeft:"10px" }}
          />
           <Row>
                                       { errornombremax  ?
                            <div className="text-muted font-italic">
                                <small>
                              <span className="text-red font-weight-700">{errornombremax}</span>
                                </small>
                            </div> :"" }

                            { !nbr_point  ?
                            <div className="text-muted font-italic">
                                <small>
                              <span className="text-red font-weight-700"></span>
                                </small>
                            </div> :"" }
                            </Row>
          <Input type="textarea" placeholder="Description" style={{ width: "200px",border: "2px solid LightGrey", borderRadius: "5px",padding:" 15px",marginTop:"10px",marginBottom:"10px",marginLeft:"10px"}}  onChange={(e) => {
                                                    
                                                    setdescription(e.target.value);
                                                    console.log("/////////nombre de point pour fidelety",description)
                                                    }} 
           />
            <Row>
                                       {errordesc  && description.length==0?
                            <div className="text-muted font-italic">
                                <small>
                              <span className="text-red font-weight-700">{errordesc}</span>
                                </small>
                            </div> :"" }
                            </Row>

                            
                          
                           
                           
                       

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
                    

                   
                  {/* </FormGroup> */}
                </Form>
                {/* </col>
                </Row> */}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                style={{border: "1px solid Chocolate"}}
              
                  onClick={()=>{changetocard(id_r,id_e,typecarte,pointcard,description,nomE,prenomE)}}
                  
               >
               
               Change
              </Button>{" "}
              <Button style={{border: "1px solid Chocolate"}} > 
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
               

                  </MDBCol>

                </MDBRow>

              </div>

           

            </Card>
          
          </div>
        </Row>

      </Container>
    </>
  );
};

export default Changeawrads;
