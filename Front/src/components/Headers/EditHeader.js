
import React from "react";

// reactstrap components
import {Button, Container, Row, Col} from "reactstrap";
import {useHistory} from "react-router-dom";

const EditHeader = () => {
    const grade = localStorage.getItem("grade")

    var Fname="none";
    var Lname="none";
    const history = useHistory();
    if(localStorage.getItem("ResponsableInfo")){
        Fname = JSON.parse(localStorage.getItem("ResponsableInfo")).nom;
        Lname = JSON.parse(localStorage.getItem("ResponsableInfo")).prenom;
      
    }else if (localStorage.getItem("employeeInfo")) {
        Fname = JSON.parse(localStorage.getItem("employeeInfo")).nom;
        Lname = JSON.parse(localStorage.getItem("employeeInfo")).prenom;
    }
    // if(localStorage.getItem("employeeInfo")){
        
    //   const Fname = JSON.parse(localStorage.getItem("employeeInfo")).nom;
    //   const Lname = JSON.parse(localStorage.getItem("employeeInfo")).prenom;
    // }
  

    return (
        <>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                    minHeight: "600px",
                    backgroundImage:
                        "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center top"
                }}
            >
                {/* Mask */}
                <span className="mask bg-gradient-default opacity-8"/>
                {/* Header container */}
                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        <Col lg="7" md="10">
                            <h1 className="display-2 text-white">Hello {Fname} {Lname}</h1>
                            {/*<p className="text-white mt-0 mb-5">*/}
                            {/*    This is your profile page. You can see the progress you've*/}
                            {/*    made with your work and manage your projects or assigned tasks*/}
                            {/*</p>*/}
                            <Button
                                color="info"
                                onClick={() => history.push('/admin/user-profile')}
                            >
                                Back to your profile
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default EditHeader;
