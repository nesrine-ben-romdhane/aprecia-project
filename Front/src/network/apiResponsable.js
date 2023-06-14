import config from "../config";
import axios from 'axios';


// const https = require('https');
//
// const agent = new https.Agent({
//     rejectUnauthorized: false,
// });

const instance = axios.create({
    baseURL: config.WS_BASE_URL
});

export const registerresponsable = async (firstname, lastname, email,password, grade) => (
    await instance.post('/responsable/', {firstname, lastname, email,password, grade})
);
export const loginresponsable = async ( email,password) => (
    await instance.post('/responsable/login', { email,password})
);
export const getAllEmployeeNotActiveList = async (id_r) => (
    await instance.get(`/responsable/employee/${id_r}`)
);
export const getAllEmploye = async (id_r) => (

    await instance.get(`/responsable/allemployee/${id_r}`)
);
export const rewardemployee = async (id_e,nbr_point) => (
     await instance.put(`/responsable/pointsrewardEmployee/${id_e}`,{nbr_point})
 );
export const TopFiveResponsableRecord = async () => (
    await instance.get(`/responsable/TopFiveresponsableRecord`)
);
export const getAllcarterestoinactive = async (id_r) => (
    await instance.get(`/responsable/allRestaurantcard/${id_r}`)
);
export const getAllcartevoyageinactive = async (id_r) => (
    await instance.get(`/responsable/allTravelCard/${id_r}`)
);
export const activercarteresto= async ( id_cr) => (
    await instance.post(`/responsable/Restaurantcard/${id_cr}`)
);
export const activercartevoyage= async ( id_v) => (
    await instance.post(`/responsable/travelcard/${id_v}`)
);
export const Deletecarteresto= async (id_cr) => (
   
    await instance.delete(`/responsable/deletecarteresto/${id_cr}`)
)
export const Deletecartevoyage= async (id_v) => (
   
    await instance.delete(`/responsable/deletecartevoyage/${id_v}`)
)
