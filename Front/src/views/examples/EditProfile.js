
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {updateemployeeinfo} from "../../network/ApiEmployee"
import {useHistory} from "react-router-dom";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import EditHeader from "../../components/Headers/EditHeader";
import {edit} from "../../network/ApiAxios";

const EditProfile = () => {
    const history = useHistory();

    let user = JSON.parse(localStorage.getItem("user"));
    const [Fname, setFname] = useState(JSON.parse(localStorage.getItem("employeeInfo")).nom);
    const [Lname, setLname] = useState(JSON.parse(localStorage.getItem("employeeInfo")).prenom);
    const [Email, setEmail] = useState(JSON.parse(localStorage.getItem("employeeInfo")).email);
    const id_e= JSON.parse(localStorage.getItem("employeeInfo")).id_e;
   
//     if(localStorage.getItem("ResponsableInfo")){
//        Fname=JSON.parse(localStorage.getItem("ResponsableInfo")).nom;
//       Lname= JSON.parse(localStorage.getItem("ResponsableInfo")).prenom;
//       Email= JSON.parse(localStorage.getItem("ResponsableInfo")).email;
    
//   }else if (localStorage.getItem("employeeInfo")) {
//      Fname=JSON.parse(localStorage.getItem("employeeInfo")).nom;
//      Lname = JSON.parse(localStorage.getItem("employeeInfo")).prenom;
//      Email= JSON.parse(localStorage.getItem("employeeInfo")).email;
//      id_e= JSON.parse(localStorage.getItem("employeeInfo")).id_e;
//   }

    // const [name, setName] = useState(user.name);
    // const [email, setEmail] = useState(user.email);
    // const [isTestUser, setIsTestUser] = useState(false);

    // useEffect(() => {
    //     if (JSON.parse(localStorage.getItem("user")).email === "test@test.com") {
    //         setIsTestUser(true);
    //     }
    // }, []);

    // const  editUser= async () => {
    //     const response = await updateemployeeinfo(user._id, name, email);
    //     const { data } = response;
    //     if (data.success) {
    //         user = {...user, name, email}
    //         localStorage.setItem("user", JSON.stringify(user));
    //         props.history.push("/admin/user-profile");
    //     }
    // }
         const updateemployee = () => {
        console.log("testeinfo",id_e,Fname,Lname,Email)
        console.log("information update",id_e)
        Swal.fire({
            title: 'Do you want update your information ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'validate',
            denyButtonText: `Don't validate`,
          }).then((result) => {
            
            if (result.value == true) {
              const response = updateemployeeinfo(id_e,Fname,Lname,Email)
              history.push("/admin/user-profile");
              console.log("jjjjjj",response)
              Swal.fire('validation successful', '', 'info');
             
            
              }
            
             else {
              console.log("**************** not confirmed ");
              Swal.fire('Changes are not saved', '', 'info');
             
             
              
            }
          
          })
    }

    return (
        <>
            <EditHeader/>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">My account</h3>
                                        {/* {isTestUser ? <h5>You are not allowed to edit the test user. Create another user to test this functionality</h5> : null} */}
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={updateemployee}
                                            size="sm"
                                            // disabled={isTestUser}
                                        >
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
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
                                                      value={Fname}
                                                      id="input-username"
                                                     
                                                      onChange={e => setFname(e.target.value)}
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
                                                        value={Lname}
                                                       
                                                        onChange={e => setLname(e.target.value)}
                                                       placeholder="Last name"
                                                    type="text"
                                                   />
                                             </FormGroup>
                                          </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4"/>
                                    {/* Address */}
                                     <h6 className="heading-small text-muted mb-4">
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
                                                        value={Email}
                                                       
                                                       
                                                        onChange={e => setEmail(e.target.value)}
                                                        placeholder="Home Address"
                                                        type="text"
                                                        
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                   
                                    </div>
                                    <hr className="my-4"/>
                                    {/* Description */}
                                    <h6 className="heading-small text-muted mb-4">About me (placeholder)</h6>
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
                                    </div> 
                                </Form> 
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
);
}

export default EditProfile;

