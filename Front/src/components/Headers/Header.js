import { useState } from "react";
import  { useEffect} from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {getsolde}from"../../network/ApiEmployee"

const Header = () => {
  const [nbrpoint,setnbrpoint]=useState("")
  const [argent,setargent]=useState("")

  var solde ="";
  var nbr_point="";
 
  if(localStorage.getItem("ResponsableInfo")){
     solde=JSON.parse(localStorage.getItem("ResponsableInfo")).solde_argent;
    nbr_point = JSON.parse(localStorage.getItem("ResponsableInfo")).nbr_point;
  
}else if (localStorage.getItem("employeeInfo")) {
  //  solde=JSON.parse(localStorage.getItem("employeeInfo")).solde_argent;
  //  nbr_point = JSON.parse(localStorage.getItem("employeeInfo")).nbr_point;
  const id_e = JSON.parse(localStorage.getItem("employeeInfo")).id_e;
    const runAsync = async () => {
        const response = await getsolde (id_e);

        setnbrpoint(response.data.data.nbr_point)
        setargent(response.data.data.solde_argent)
        console.log("data solde points****************************************",nbrpoint);
        console.log("data solde ***************************",argent);
     
    }
    runAsync();
     nbr_point =nbrpoint;
     solde = argent;

}

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8" >
        <Container fluid>
          <div className="header-body" >
            {/* Card stats */}
            <Row  >
              <Col lg="6" xl="3"  >
                <Card className="card-stats mb-4 mb-xl-0 " >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Money Balance
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        {solde} DT
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                   
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                           Number points
                          
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0"> {nbr_point} Point </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                   
                  </CardBody>
                </Card>
              </Col>
             
              
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
