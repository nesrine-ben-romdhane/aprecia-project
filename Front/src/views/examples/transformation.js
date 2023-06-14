import React from "react";
import  {useState}  from "react";
import  { useEffect} from "react";
import { Card, Container, Row,CardHeader, Button } from "reactstrap";
import Header from "../../components/Headers/Header";
import {getAlltransformationNotActive} from "../../network/ApiEmployee"
import {updatedonationstatus} from "../../network/ApiAssociation"
import{updatetransformationstatus} from "../../network/ApiEmployee"
import {Deletetransformation}from "../../network/ApiEmployee"
import Swal from "sweetalert2";
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBBadge,
    MDBCardFooter,
    MDBBtn ,
    MDBIcon,
    

  } from 'mdb-react-ui-kit';


const Valdonation = () => {
    const id_r = JSON.parse(localStorage.getItem("ResponsableInfo")).id_r;
    const nomR = JSON.parse(localStorage.getItem("ResponsableInfo")).nom;
    const prenomR = JSON.parse(localStorage.getItem("ResponsableInfo")).prenom;
    const[listtransformation,setlisttransformation]=useState([])
  


    useEffect(() => {
        const runAsync = async () => {
            const response = await getAlltransformationNotActive (id_r);
            const {data} = response;
            console.log("data donation**************************************************",data );
            if (data.success) {
                setlisttransformation(data.transformationlist);
                   console.log("listdonation///////////////////////////////////",listtransformation);
            }
        }
        runAsync();
    }, []);


    ///////////////////////////////////////////////////////
    const updatestatus = (id_t,nomR,prenomR) => {
        console.log("information update",id_t,nomR,prenomR)
        Swal.fire({
            title: 'Do you want to validate the change?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'validate',
            denyButtonText: `Don't validate`,
          }).then((result) => {
            
            if (result.value == true) {
                console.log("test validation",id_t,nomR,prenomR)
              const response = updatetransformationstatus(id_t,nomR,prenomR)
              console.log("test validation",response)
              Swal.fire('validation successful', '', 'info');
             
            
              }
            
             else {
              console.log("**************** not confirmed ");
              Swal.fire('Changes are not saved', '', 'info');
             
             
              
            }
          
          })
    }
    ////////////////////////////////////////////////////////////////////////
const delete_transformation=(id_t)=>{
    console.log("id_t",id_t)
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value == true) {
            console.log("teste11111111")
            const response = Deletetransformation(id_t)
            console.log("response",response)
            console.log("**************** delete operation success ");
      
        Swal.fire("Deleted!", "", "success");
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
}

    return(
    <>
          <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
                <div className="col">
                    <Card className="shadow border-0">
                    <CardHeader className="border-0">
                         <h3 className="mb-0" >Transformation Not Validate</h3>
                    </CardHeader>
                    <MDBRow style={{paddingLeft:"20px",paddingRight:"20px"}}>
                    {listtransformation.map((transformation) => (
                            <MDBCol xl={6} className='mb-4' >
                                <MDBCard>
                               
                                <MDBCardBody style={{height:"150px"}}>
                                
                                    <div className='d-flex justify-content-between align-items-center'>
                                        
                                    <div className='d-flex align-items-center'>
                                   
                                        <img
                                           src={`data:image/jpeg;base64,${transformation.id_e_employee.image}`}
                                        alt=''
                                        style={{ width: '45px', height: '45px',marginTop:"-80px" }}
                                        className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                        <p className='fw-bold mb-1'> <b>{transformation.id_e_employee.nom}{" "}{transformation.id_e_employee.prenom}</b></p>
                                        <p className='text-muted mb-0' >Has a transformation of points :<br/> {transformation.nbr_point} points to {transformation.montant} DT</p>
                                        {/* <MDBIcon fas icon="exchange-alt" style={{color:"blue"}} /> {transformation.type_transaction} */}
                                         <MDBIcon far icon="calendar-alt" style={{color:"blue"}} />  {transformation.date_t} <br/>
                                        
                                        </div>
                                    </div>
                                    <MDBBadge pill color='warning' light style={{marginTop:"-90px"}}>
                                        Awaiting
                                    </MDBBadge>
                                    </div>
                                </MDBCardBody>
                                <MDBCardFooter style={{backgroundColor:"#f7f7f7"}} border='0' className='p-2 d-flex justify-content-around'>
                                    <Button color='link'  className='text-reset m-0 ' onClick={()=>{
                                         updatestatus(transformation.id_t,nomR,prenomR)
                                       console.log("teste") }} >
                                    <MDBIcon fas icon="check-circle" style={{color:"green"}} />  Validate
                                    </Button>
                                    <Button color='link'  className='text-result m-0'  onClick={()=>{
                                         delete_transformation(transformation.id_t)
                                        }} >
                                    <MDBIcon fas icon="trash-alt" style={{color:"red"}}/> Delete 
                                    </Button>
                                </MDBCardFooter>
                                </MDBCard>
                            </MDBCol>
                    ))}
                            
                        </MDBRow>

                     </Card>
                </div>
            </Row>
        </Container>
    </>
    )

}
export default Valdonation;