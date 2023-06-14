
import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled, useTheme } from '@mui/material/styles'
import Imagebg from "../../assets/img/brand/triangle-light.png";
import Imagere from"../../assets/img/brand/trophy.png";
import data from"../../assets/img/brand/no-data-found.png";
import Modal from "react-bootstrap/Modal";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import {
  faUser,
  faCalendarDays,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import {useHistory} from "react-router-dom";
import { Email } from "@mui/icons-material";
import {historyRecompense }from "../../network/ApiEmployee"
import {historytransfer}from "../../network/ApiEmployee"
import Typography from "@mui/material/Typography";
const TriangleImg = styled('img')({
    right: 0,
    bottom: 0,
    height: 170,
    position: 'absolute'
  })
  
  // Styled component for the trophy image
  const TrophyImg = styled('img')({
    right: 36,
    bottom: 20,
    height: 98,
    position: 'absolute'
  })

const Profile = () => {
const [historyrec,sethistoryrec]=useState([])
const [htransfer,sethtransfer]=useState([])
const [showadd, setShowadd] = useState(false);
const handleCloseadd = () => setShowadd(false);
  const handleShowadd = () => {
    setShowadd(true);
    //  console.log("************** employe modal "+JSON.stringify(id_e));
  };

  var Fname ="";
  var Lname="";
  var Email=""
  var id_e=""
 
  if(localStorage.getItem("ResponsableInfo")){
     Fname=JSON.parse(localStorage.getItem("ResponsableInfo")).nom;
    Lname= JSON.parse(localStorage.getItem("ResponsableInfo")).prenom;
    Email= JSON.parse(localStorage.getItem("ResponsableInfo")).email;
  
}else if (localStorage.getItem("employeeInfo")) {
   Fname=JSON.parse(localStorage.getItem("employeeInfo")).nom;
   Lname = JSON.parse(localStorage.getItem("employeeInfo")).prenom;
   Email= JSON.parse(localStorage.getItem("employeeInfo")).email;
   id_e= JSON.parse(localStorage.getItem("employeeInfo")).id_e;
}

    const history = useHistory();
    useEffect(() => {
        const runAsync = async () => {
          console.log("/////id_e", id_e);
    
          const response = await historyRecompense(id_e);
          const data = response.data.message;
          const Transfer = await historytransfer(id_e)
          const datatransfer = Transfer.data.message
          sethtransfer(datatransfer)
          console.log("teste transfer histiry",htransfer.length)
       
          console.log(
            "data historiiii**************************************************",
            response
          );
       
    
        //   if (data.success) {
            
            sethistoryrec(data);
            console.log(
              "data success historie///////////////////////////////////",
              historyrec.length
            );
               console.log("data response",data)
        //   }
        };
        runAsync();
      }, []);
    

    return (
        <>
            <UserHeader/>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                className="rounded-circle"
                                                src={require("assets/img/theme/team-4-800x800.jpg").default}
                                            />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                    <Button
                                        className="mr-4"
                                        color="info"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                        size="sm"
                                    >
                                        Connect
                                    </Button>
                                    <Button
                                        className="float-right"
                                        color="default"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                        size="sm"
                                    >
                                        Message
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                                <Row>
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            <div>
                                                <span className="heading">{ historyrec.length}</span>
                                                <span className="description">Award History</span>
                                            </div>
                                            <div>
                                                <span className="heading">{htransfer.length}</span>
                                                <span className="description">Transfer History</span>
                                            </div>
                                            {/* <div>
                                                <span className="heading">89</span>
                                                <span className="description">Comments</span>
                                            </div> */}
                                        </div>
                                    </div>
                                </Row>
         <Modal show={showadd} onHide={handleCloseadd}>
          <Modal.Header closeButton style={{backgroundColor:"blue"}}> 
            <Modal.Title >
            <h2>Transfer History</h2>
            </Modal.Title>
          </Modal.Header>
          

          <Modal.Body>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {htransfer.map((transfer) => (
                <ListItem>
                    <ListItemAvatar>
                    
                    <img style={{width:"40px",height:"40px"}}
                              alt="no image availble"
                              src={`data:image/jpeg;base64,${transfer.id_e_r_employee.image}`}
                            />
                  
                    </ListItemAvatar>
                    <ListItemText secondary= {transfer.date_attribuation}>You have sent {transfer.nbr_point} points to {transfer.id_e_r_employee.nom} {transfer.id_e_r_employee.prenom}</ListItemText>
               
                </ListItem>
                
                 
                
            ))}
     
             </List>

                        
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseadd}>
              Close
            </Button>
            </Modal.Footer>
         
        </Modal>
































                                <div className="text-center">
                                    <h3>
                                        {Fname}{Lname}
                                        <span className="font-weight-light">, 27</span>
                                    </h3>
                                    <div className="h5 font-weight-300">
                                        <i className="ni location_pin mr-2"/>
                                        Bucharest, Romania
                                    </div>
                                    <div className="h5 mt-4">
                                        <i className="ni business_briefcase-24 mr-2"/>
                                        Solution Manager - Creative Tim Officer
                                    </div>
                                    <div>
                                        <i className="ni education_hat mr-2"/>
                                        University of Computer Science
                                    </div>
                                    <hr className="my-4"/>
                                    <p>
                                        Ryan — the name taken by Melbourne-raised, Brooklyn-based
                                        Nick Murphy — writes, performs and records all of his own
                                        music.
                                    </p>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        Show more
                                    </a>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">My History</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={() => handleShowadd()}
                                            size="sm"
                                        >
                                            Transfer History
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        User information (from database)
                                    </h6>
                                    <div className="pl-lg-4">
                                       
                                        <Row>
                                           <Col lg="6">
                                               <FormGroup>
                                                   <label
                                                    className="form-control-label"
                                                       htmlFor="input-first-name"
                                                    >
                                                  First name
                                                  </label>
                                                   <Input
                                                      className="form-control-alternative"
                                                    defaultValue={Fname}
                                                        id="input-first-name"
                                                       placeholder="First name"
                                                       type="text"
                                                   />
                                           </FormGroup>
                                           </Col>
                                          <Col lg="6">
                                              <FormGroup>
                                                   <label
                                                     className="form-control-label"
                                                    htmlFor="input-last-name"
                                                >
                                                      Last name
                                                </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                       defaultValue={Lname}
                                                       id="input-last-name"
                                                       placeholder="Last name"
                                                    type="text"
                                                   />
                                             </FormGroup>
                                          </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4"/>
                                    {/* Address */}
                                    {/* <h6 className="heading-small text-muted mb-4">
                                        Contact information (placeholder)
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-address"
                                                    >
                                                        Address Email
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue={Email}
                                                        id="input-address"
                                                        placeholder="Home Address"
                                                        type="text"
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-city"
                                                    >
                                                        City
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="New York"
                                                        id="input-city"
                                                        placeholder="City"
                                                        type="text"
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Country
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="United States"
                                                        id="input-country"
                                                        placeholder="Country"
                                                        type="text"
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-country"
                                                    >
                                                        Postal code
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-postal-code"
                                                        placeholder="Postal code"
                                                        type="number"
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4"/>
                                    {/* Description */}
                                    {/* <h6 className="heading-small text-muted mb-4">About me (placeholder)</h6>
                                    <div className="pl-lg-4">
                                        <FormGroup>
                                            <label>About Me</label>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="A few words about you ..."
                                                rows="4"
                                                defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                                                type="textarea"
                                                disabled
                                            />
                                        </FormGroup>
                                    </div> */} 
                                {/* </Form> */} 



 {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
 {historyrec.map((hist) => (
 <tr>

                                    {/* <Col sm="12"  > */}
                                      <Card body  sx={{ position: 'relative' }} style={{paddingLeft:"20px",paddingBottom:"20px",width:"400px",marginBottom:"20px",marginLeft:"100px"}}>
                                        <CardTitle  >
                                         <Typography variant='h6'>Congratulations 🥳! 
                                         </Typography>
                                          <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                                            You Received {hist.nbr_point}  points from your manager 
                                          <br />
                                             
                                         </Typography>
                                      </CardTitle>
                                        <CardText>
                                         <Row>
                                            <Col>
                                              <FontAwesomeIcon
                                              style={{color:"#f0ad4e",fontSize:"20px"}}
                                                icon={faCalendarDays }
                                              />
                                             {''}  {''} On {hist.date_hp}
                                            </Col>
                                          </Row>
                                          <Col>
                                          {/* <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                                              <FontAwesomeIcon icon={faAward} />
                                            
                                              Number of points
                                              </Typography> */}
                                            </Col>
                                        </CardText>
                                        
                                         <TriangleImg alt='triangle background' src={Imagebg} />
                                        <TrophyImg alt='trophy' src={Imagere } style={{height:"80px"}} />
                                        
                                       
                                      </Card>
                                    {/* </Col> */}
                                   </tr>
                                   ))}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Profile;
