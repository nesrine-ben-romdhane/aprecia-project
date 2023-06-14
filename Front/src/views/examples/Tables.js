import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  Label,
  option,
  Row,
  Col
} from "reactstrap";
import {
  faTrash,
  faGifts,
  faIdCardClip,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

import logo from "../../assets/img/brand/pointFiedelty.png";
import p2 from "../../assets/img/brand/p2.png";
import p3 from "../../assets/img/brand/p3.png";
import {addemployee}  from "../../network/ApiEmployee"

// reactstrap components
import {
  Badge,
  // Card,
  // CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  // Row,
  // Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getAllEmploye } from "../../network/apiResponsable";
import { rewardemployee } from "../../network/apiResponsable";
import { DeleteEmployee } from "../../network/ApiEmployee";

const Tables = () => {
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
 
 // const [submitState,setsubmitState]=useState(false)

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeemployee, setactiveemployee] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [point, setpoint] = useState(0);
  

  const [show, setShow] = useState(false);
  const [showadd, setShowadd] = useState(false);
  
  const [employeemodal, setEmployeemodal] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    //  console.log("************** employe modal "+JSON.stringify(id_e));
  };
  const id_r = JSON.parse(localStorage.getItem("ResponsableInfo")).id_r;

  const handlepoints = async () => {
    console.log("//////////////////////////////////test");

    const response = await rewardemployee(employeemodal.id_e, point);
    Swal.fire("points added successfuly", "", "info");
    console.log("//////////////////////////////////reward///////////");

    setShow(false);
  };
  const handleCloseadd = () => setShowadd(false);
  const handleShowadd = () => {
    setShowadd(true);
    //  console.log("************** employe modal "+JSON.stringify(id_e));
  };


  const handladdemployee= async (Fname,Lname,email,Password,id_r) => {
    console.log("//////////////////////////////////test");

    const response = await addemployee (Fname,Lname,email,Password,id_r);
    Swal.fire('aded employee  successfuly', '', 'info');

    setFname("")
    setEmail("")
    setLname("")
    setConfirmPassword("")
    setPassword("")
    
    console.log("//////////////////////////////////reward///////////");

    // setShowadd(false);
  };
 

  useEffect(() => {
    const runAsync = async () => {
      console.log("/////id_r", id_r);

      const response = await getAllEmploye(id_r);
      const { data } = response;
      console.log(
        "data**************************************************",
        data
      );

      if (data.success) {
        setactiveemployee(data.data);
        console.log(
          "data success///////////////////////////////////",
          activeemployee
        );
      }
    };
    runAsync();
  }, []);

  const saveEmployeeinfoModal = (employee) => {
    setEmployeemodal(employee);
    console.log("************ epmloyee data modal " + JSON.stringify(employee));
  };

  const DeleteEmployeeFn = (id_e, nom, prenom, employee) => {
    console.log(
      "************************** nom " +
        nom +
        " prenom " +
        prenom +
        " id e " +
        id_e
    );

    Swal.fire({
      title: "Do you want to to Delete " + nom + " " + prenom,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      console.log("***************result " + JSON.stringify(result));
      /* Read more about isConfirmed, isDenied below */
      if (result.value == true) {
        console.log("************************** delete  ");
        const reponse = DeleteEmployee(id_e)
          .then((reponse) => {
            console.log("**************** delete operation success ");
            var newlistEmployee = activeemployee.filter(
              (item) => item !== employee
            );
            setactiveemployee(newlistEmployee);
            Swal.fire("Deleted!", "", "success");
          })
          .catch((err) => {
            console.log("**************** delete operation failed");

            Swal.fire("Delete not confirmed", "", "info");
          });
      } else {
        console.log("**************** not confirmed ");
        Swal.fire("Delete not confirmed", "", "info");
      }
    });
  };

  const history = useHistory();

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Setting point to {employeemodal.nom} {employeemodal.prenom}{" "}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <style>
              {`
              .imgDiv{
                height:80px;
                
              }
              .divpoint{
                
                transition: 1s;
              }
              .divpoint:hover {
                transform: scale(0.9);
                background-color:rgba(0,0,255,0.3);
              }
              .rowpoint{
                margin : auto;
              }
                .selectedPoint {
                  position: absolute;
                  margin-top: 20px;
                  margin-left: 20px;
              }
            
              
              
              

          `}
            </style>

            <Form>
              <Row className="rowpoint">
                <Col
                  className="divpoint"
                  xs={6}
                  md={4}
                  onClick={() => {
                    setpoint(50);
                  }}
                >
                  <img alt="not disponible" className="imgDiv" src={p2} />
                  <h4>50 points</h4>
                </Col>
                <Col
                  className="divpoint"
                  xs={6}
                  md={4}
                  onClick={() => {
                    setpoint(100);
                  }}
                >
                  <img alt="not disponible" className="imgDiv" src={logo} />
                  <h4>100 points</h4>
                </Col>

                <Col
                  className="divpoint"
                  xs={6}
                  md={4}
                  onClick={() => {
                    setpoint(200);
                  }}
                >
                  <img alt="not disponible" className="imgDiv" src={p3} />
                  <h4>200 points</h4>
                </Col>
              </Row>
              <Row className="selectedPoint">
                <h4>selected Points {point} </h4>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handlepoints}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* /////////////////////////////////////////////////////////////////////////// */}
        <Modal show={showadd} onHide={handleCloseadd}>
          <Modal.Header closeButton>
            <Modal.Title>
              Add employee
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
           

            <Form role="form">
                            <FormGroup style={{float:'left'}}>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="First Name" type="text" value={Fname}
                                           onChange={e => setFname(e.target.value)} 
                                    />
                                    
                                </InputGroup>
                               
                            </FormGroup >
                           
                            <FormGroup style={{float:'left'}}>
                                <InputGroup className="input-group-alternative mb-3 ml-2">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Last Name" type="text" value={Lname}
                                           onChange={e => setLname(e.target.value)} 
                                    />
                                </InputGroup>
                               
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input required={true} placeholder="Your Email" type="email"  value={email}
                                           onChange={e => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                          

                           
                            </FormGroup>
                          
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Password" type="password" autoComplete="new-password" value={password}
                                           onChange={e => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                               
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input placeholder="Confirm Password" type="password" autoComplete="new-password" value={confirmPassword}
                                           onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </InputGroup>
                               
                          
                            </FormGroup>
                               


                                 
                                 
                                 
                          
                        </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseadd}>
              Close
            </Button>
            <Button variant="primary"
              onClick={() => {
                handladdemployee(Fname,Lname,email,password,id_r);
                handleCloseadd();
              }}
             >
            Create account
            </Button>
          </Modal.Footer>
        </Modal>


        {/* Table */}
      
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <CardHeader className="border-0">
                <h3 className="mb-0" style={{ display: "inline" }}>
                  {" "}
                  Score
                </h3>
             <div  style={{ marginLeft: "700px" }}>
                <Button
                  size="sm"
                  color="primary"
                  // style={{ marginLeft: "750px" }}
                  onClick={() => history.push("/admin/users")}
                >
                  Inactive Employee{" "}
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  // style={{ marginLeft: "820px" }}
                  onClick={() => handleShowadd()}
                >
                  Add Employee{" "}
                </Button>
                </div>

              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Rank</th>
                    <th scope="col">Score</th>
                    {/* <th scope="col">rewards</th> */}
                    <th scope="col">Action </th>
                  </tr>
                </thead>
                <tbody>
                  {activeemployee.map((employee) => (
                    <tr key={employee.email}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="no image availble"
                              src={`data:image/jpeg;base64,${employee.image}`}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              {employee.nom} {employee.prenom}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{employee.email}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          {employee.grade}
                        </Badge>
                      </td>
                      <td>{employee.nbr_point}</td>

                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={() =>
                                DeleteEmployeeFn(
                                  employee.id_e,
                                  employee.nom,
                                  employee.prenom,
                                  employee
                                )
                              }
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ color: "#d51b07" }}
                              />
                              Withdraw
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              //onClick={handleShow}
                              onClick={() => {
                                handleShow();
                                saveEmployeeinfoModal(employee);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faGifts}
                                style={{ color: "#4d6ca3" }}
                              />
                              Gift Points
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
