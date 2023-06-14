import React from 'react';
import { useState } from "react";
import { useEffect } from "react";

import Header from "components/Headers/Header.js";
import { getAllcarterestoinactive } from "../../network/apiResponsable"
import {activercarteresto} from "../../network/apiResponsable"
import Swal from "sweetalert2";
import {Deletecarteresto}from "../../network/apiResponsable"
import {getAllcartevoyageinactive}from "../../network/apiResponsable"
import {activercartevoyage}from"../../network/apiResponsable"
import{Deletecartevoyage}from "../../network/apiResponsable"

import {
    MDBIcon,
} from 'mdb-react-ui-kit';

import { Card, Container, Row, Col ,CardHeader} from "reactstrap";
const Gift_card = () => {
    const id_r = JSON.parse(localStorage.getItem("ResponsableInfo")).id_r;
    const [listcarterestau, setlistcarterestau] = useState([])
    const [listcartevoyage, setlistcartevoyage] = useState([])
    useEffect(() => {
        const runAsync = async () => {
            const response = await getAllcarterestoinactive(id_r);
            const { data } = response;
            console.log("data resto card**************************************************", data);
            // if (data.success) {
            setlistcarterestau(data.data);
            console.log("listresat///////////////////////////////////", listcarterestau);
            const response2 = await getAllcartevoyageinactive(id_r);
            const {data2}=response2;
            
            
            console.log("carte voyage======>",response2.data.data)
            setlistcartevoyage(response2.data.data)
            console.log("carte voyage teste tableau======>",listcartevoyage)
            // }
        }
        runAsync();
    }, []);
    const updatestate = (id_cr) => {
        console.log("information update",id_cr)
        Swal.fire({
            title: 'Do you want to validate the card?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'validate',
            denyButtonText: `Don't validate`,
          }).then((result) => {
            
            if (result.value == true) {
              const response = activercarteresto(id_cr)
              console.log("jjjjjj",response)
              Swal.fire('validation successful', '', 'info');
             
            
              }
            
             else {
              console.log("**************** not confirmed ");
              Swal.fire('Changes are not saved', '', 'info');
             
             
              
            }
          
          })
    }
    const delete_transformation=(id_cr)=>{
        console.log("id_cr",id_cr)
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
                const response = Deletecarteresto(id_cr)
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

    const updatestatecartevoyage = (id_v) => {
        console.log("information update",id_v)
        Swal.fire({
            title: 'Do you want to validate the card?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'validate',
            denyButtonText: `Don't validate`,
          }).then((result) => {
            
            if (result.value == true) {
              const response = activercartevoyage(id_v)
              console.log("jjjjjj",response)
              Swal.fire('validation successful', '', 'info');
             
            
              }
            
             else {
              console.log("**************** not confirmed ");
              Swal.fire('Changes are not saved', '', 'info');
             
             
              
            }
          
          })
    }
    const deletecarde=(id_v)=>{
        console.log("id_v",id_v)
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
                const response = Deletecartevoyage(id_v)
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
    return (
        <>
            <Header />
            <Container>

              
                    <div className="col mt--7">
                        <Card className="shadow" style={{ paddingBottom: "100px" ,position:"relative"}}>
                        <CardHeader className="border-0">
                <h3 className="mb-0" >Transformation Card</h3>
              </CardHeader>
              <Row>
                            <Col>
                            <div >
                                <div>
                                {listcarterestau.map((carterestau) => (
                                   
                                    <div class="card border rounded-3 " >
                                       

                                            <div class="card-body ">
                                                <div class="row">
                                                    <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                        <div class="bg-image hover-zoom ripple rounded ripple-surface">
                                                            <img src="https://us-ticket.com/images/Roll-Tickets/Meal-Roll-Tickets.png"
                                                                class="w-100" />
                                                            <a href="#">
                                                                <div class="hover-overlay">
                                                                    <div class="mask" style={{ backgroundColor: "gba(253, 253, 253, 0.15)" }}></div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-lg-6 col-xl-6">
                                                        <h4>{carterestau.id_e_employee.nom} {carterestau.id_e_employee.prenom}</h4>

                                                        <p class=" mb-4 mb-md-0">
                                                            He changed {carterestau.nbr_point} points into resturant card
                                                        </p>
                                                        <div class="mb-2 text-muted small">
                                                            <span class="text-primary"> • </span>
                                                            <span>Ticket number {carterestau.nbr_ticket}</span><br />
                                                            <span class="text-primary"> • </span>
                                                            <span>The ticket price is {carterestau.valeur_ticket} dinars</span><br />
                                                            <MDBIcon far icon="calendar-alt" style={{ color: "blue" }} />  {carterestau.date_cr} <br />

                                                        </div>

                                                    </div>
                                                    <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                        <div class="d-flex flex-row align-items-center mb-1">
                                                            <h4 class="mb-1 me-1">${carterestau.nbr_ticket} Meal tickets</h4>
                                                            {/* <span class="text-danger"><s>$21.99</s></span> */}
                                                        </div>
                                                        <h6 class="text-success">Free Of use </h6>
                                                        <div class="d-flex flex-column mt-4">
                                                            <button class="btn btn-outline-primary  btn-sm" type="button"  onClick={()=>{
                                         updatestate(carterestau.id_cr)
                                       console.log("teste") }} >Validate</button>
                                                            <button class="btn btn-outline-danger btn-sm mt-2" type="button" onClick={()=>{
                                         delete_transformation(carterestau.id_cr)
                                        }}>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        
                                    </div>
                                  
                                    ))}
                                </div>
                            </div>
                            </Col>
{/* ////////////////////////////////////////////////////////////////////////////////// */}
<Col  >
<div class=" mb-3" >
                                <div >
                                {listcartevoyage.map((cartevoyage) => (
                                   
                                    <div class="card border rounded-3 " >
                                       

                                            <div class="card-body ">
                                                <div class="row">
                                                    <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                        <div class="bg-image hover-zoom ripple rounded ripple-surface">
                                                            <img src="https://img.freepik.com/vecteurs-premium/billets-avion-pour-papier-creatif-voyage-illustration_194782-105.jpg"
                                                                class="w-100" />
                                                            <a href="#">
                                                                <div class="hover-overlay">
                                                                    <div class="mask" style={{ backgroundColor: "gba(253, 253, 253, 0.15)" }}></div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-lg-6 col-xl-6">
                                                        <h4>{cartevoyage.id_e_employee.nom} {cartevoyage.id_e_employee.prenom}</h4>

                                                        <p class=" mb-4 mb-md-0">
                                                            He changed {cartevoyage.nbr_point} points into Travel card
                                                        </p>
                                                        <div class="mb-2 text-muted small">
                                                           
                                                            
                                                            <span class="text-primary"> • </span>
                                                            <span> Reduction {cartevoyage.reduction} % of travel</span><br />
                                                            <MDBIcon far icon="calendar-alt" style={{ color: "blue" }} /> {cartevoyage.date_cv} <br />

                                                        </div>

                                                    </div>
                                                    <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                        <div class="d-flex flex-row align-items-center mb-1">
                                                            <h4 class="mb-1 me-1">Reduction <br/>{cartevoyage.reduction} % </h4>
                                                            {/* <span class="text-danger"><s>$21.99</s></span> */}
                                                        </div>
                                                        <h6 class="text-success">Free Of use </h6>
                                                        <div class="d-flex flex-column mt-4">
                                                            <button class="btn btn-outline-primary btn-sm" type="button"   onClick={()=>{
                                         updatestatecartevoyage(cartevoyage.id_v)
                                       console.log("teste") }} >Validate</button>
                                                            <button class="btn btn-outline-danger btn-sm mt-2" type="button" onClick={()=>{
                                         deletecarde(cartevoyage.id_v)
                                        }}>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    
                                    </div>
                                    
                                  
                                    ))}
                                </div>
                               
                            </div>
                            
                            </Col>

                            </Row>


                        </Card>
                    </div>
                

            </Container>
        </>
    );
}
export default Gift_card;