

import { useEffect } from "react";
import Header from "../../components/Headers/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophyStar} from "@fortawesome/free-solid-svg-icons";
import logoreward from "../../assets/img/brand/mmmm.png";
import coupe from "../../assets/img/brand/coup.png";
import logo from "../../assets/img/brand/logo.png";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";
import { useReward } from 'react-rewards';



import {
 
  Container,
  Media,
  Button,
  Card,
  CardHeader,
  Table,
  Col,
   
} from "reactstrap";
import React, { useState } from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {AllemployeeInMyDepartment} from "../../network/ApiEmployee";
import{RewardPointToOtheEmployee} from "../../network/ApiEmployee"


const ManageRewardsEmployee = () =>{

  const [nbr_point, setnbr_point] = React.useState(0);
  const handleChange = (event) => {
    setnbr_point(event.target.value);
  };





  const [modal, setModal] = useState(false);
  const [employeer,setemployeer]=useState("")

 const saveemployee=(employee)=>{
  setemployeer(employee)
  console.log("////////////test info employeee",employee)
 }
  const toggle = () => {
    setModal(!modal);
    
  }
 
  const handleReward=async (id_r,id_e,nbr_point,nomE,prenomE,nomR,prenomR,id_er)=>{
    console.log("testttttttttttttthhhhhhhhhhhhhhhhhhhttrewarddddd",id_r,id_e,nbr_point,nomE,prenomE,nomR,prenomR,id_er)
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.value == true) {
        const response = RewardPointToOtheEmployee(id_r,id_e,nbr_point,nomE,prenomE,nomR,prenomR,id_er)
        Swal.fire('Saved!', '', 'success')
        setModal(!modal);
        }
       
      
      
       else {
        console.log("**************** not confirmed ");
        Swal.fire('Changes are not saved', '', 'info')
        setModal(!modal);
        
      }
    
    })
   
 
   
    // const response = RewardPointToOtheEmployee(id_r,id_e,nbr_point,nomE,prenomE,nomR,prenomR,id_er);
   
    // setModal(!modal);
  }
 

////////////////////////////////////////////////////////////////////

  const [allemployee,setallemployee]=useState([])
  const id_r = JSON.parse(localStorage.getItem("employeeInfo")).id_r;
  const id_e = JSON.parse(localStorage.getItem("employeeInfo")).id_e;
  const nomE = JSON.parse(localStorage.getItem("employeeInfo")).nom;
  const prenomE = JSON.parse(localStorage.getItem("employeeInfo")).prenom;
  console.log("/////////// id_r",id_r)

  useEffect(() => {
    const runAsync = async () => {
        const response = await AllemployeeInMyDepartment(id_r,id_e);
        const {data} = response;
        console.log("data**************************************************",data);
        if (data.success) {
          setallemployee(data.data);
               console.log("data success///////////////////////////////////",allemployee);
        }
    }
    runAsync();
}, []);
 
    return (
      <>
      <Header/>
      <Container className="mt--7" >
      <div  >
            <Card >
              <CardHeader className="border-0">
                <h3 className="mb-0">Awred Your Colleagues</h3>
              </CardHeader>
             <Table className="align-items-center table-flush shadow" responsive>
                <thead className="thead-light" >
                  <tr >
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                   
                    <th scope="col">rewards</th>
                   
                  </tr>
                </thead>
                              
                <tbody>
                  {allemployee.map((employee) => (
                    <tr key={employee.email}>
                      {/* <p>{convertBlobToBase64(employee.image.data)}</p> */}
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
                    
                      <td >
                      <Button outline size="sm" color="primary" onClick={()=>{toggle()
                      saveemployee(employee)
                      }}>  Gift Points </Button>
                   <Col>
                   <Modal isOpen={modal} fade={false} toggle={toggle}>
                        <ModalHeader toggle={toggle}><span><h2 style={{color:"#3c148c"}}>  <img alt="not disponible" className="imgDiv" src={logo} style={{height:"40px",width:"40px"}}/> Configure Your Awred </h2></span> 
                        </ModalHeader>
                        <ModalBody>
                             <h4 style={{marginTop:"-30px"}}>Chose an award for {employeer.nom} {employeer.prenom}
                             {/* <img src={coupe}alt="coupe" style={{height:"25px",width:"30px"}}/> */}
                              </h4> 
                           
                           <img alt="not disponible" className="imgDiv" src={logoreward}  style={{height:"300px",width:"350px",marginLeft:"50px"}}/>
                      
                           <div>
                          
                            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                                <InputLabel id="demo-select-small">select Awred </InputLabel>
                                <Select
                                  labelId="demo-select-small"
                                  id="demo-select-small"
                                  value={nbr_point}
                                  label="awred value"
                                  onChange={handleChange}
                                >
                                  <MenuItem value="">
                                    <em>selected value</em>
                                  </MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                  <MenuItem value={10}>10</MenuItem>
                                  <MenuItem value={20}>20</MenuItem>
                                  <MenuItem value={40}>40</MenuItem>
                                  <MenuItem value={60}>60</MenuItem>
                                  <MenuItem value={100}>100</MenuItem>
                                </Select>
                              </FormControl>
                     
                           </div>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary"
                             onClick={()=>{handleReward(id_r,id_e,nbr_point,nomE,prenomE,employeer.nom,employeer.prenom,employeer.id_e)}}>
                              Submit
                            </Button>{' '}
                            <Button color="secondary" onClick={toggle}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                       </Col>
                      </td>
                     
                       

                     
                    </tr>
                    
                    
                    
                  ))}
                </tbody>
              </Table>
              </Card>
              </div>


    </Container>          
  </>
    );
}


export default ManageRewardsEmployee;
