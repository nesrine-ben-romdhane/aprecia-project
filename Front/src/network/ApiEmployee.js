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



export const register = async (firstname, lastname, email,password, grade, Emailresponsable) => (
    await instance.post('/employee/', {firstname, lastname, email,password, grade, Emailresponsable})
);
export const loginemployee = async ( email,password) => (
    await instance.post('/employee/login_employee', { email,password})
);

export const updateStateAccountToActive = async (id_e) => (
   // await instance.put('/employee/active/${id_e}')
    await instance.put(`/employee/active/${id_e}`)
)
export const DeleteEmployee = async (id_e) => (
    // await instance.put('/employee/active/${id_e}')
     await instance.delete(`/employee/delete/${id_e}`)
 )
 export const AllemployeeInMyDepartment = async (id_r,id_e) => (
    await instance.get(`/employee/AllemployeeInMyDepartment/${id_r}/${id_e}`)
);
export const RewardPointToOtheEmployee = async (id_r,id_e,nbr_point,nomE,prenomE,nomR,prenomR,id_er) => (
    await instance.post('/employee/RewardPointToOtheEmployee',{id_r,id_e,nbr_point,nomE,prenomE,nomR,prenomR,id_er})
);

export const TopFiveEmployeeRecord = async () => (
    await instance.get(`/employee/TopFiveEmployeeRecord`)
);
export const changeMoneyEmployee = async (id_r,id_e,nbr_point,nom,prenom) => (
    await instance.post(`employee/changeMoneyEmployee/${id_e}`,{id_r,nbr_point,nom,prenom})
    
);

export const getAlltransformationNotActive = async (id_r) => (
    await instance.get( `employee/all_transformation/${id_r}`)  
);

export const updatetransformationstatus = async (id_t,nomR,prenomR) => (
    await instance.post( `/employee/transformation/${id_t}`,{nomR,prenomR})
   
);
export const Deletetransformation = async (id_t) => (
  
     await instance.delete(`/employee/delete_transformation/${id_t}`)
 )
 export const cartecadeaux = async (id_r,id_e,typeoperation,nbr_point,desc,nomE,prenomE) => (
  
    await instance.post(`/employee/cartecadeaux`,{id_r,id_e,typeoperation,nbr_point,desc,nomE,prenomE})
)

export const savecomentaire = async (coment,id_e,id_r) => (
  
    await instance.post(`/comentaire/createcomentaire`,{coment,id_e,id_r})
)
export const savereact = async (id_r,nbrreact) => (
  
    await instance.post(`/comentaire/saveRecomponsesIncremnt`,{id_r,nbrreact})
)
export const addemployee = async (firstname, lastname, email,password,id_r) => (
    await instance.post('/employee/addemployee', {firstname, lastname, email,password,id_r})
);
export const historyRecompense= async (id_e) => (
    await instance.get( `employee/getAllHistoriqueList/${id_e}`)  
);
export const historytransfer= async (id_e) => (
    await instance.get( `employee/getAllHistoriqueechange/${id_e}`)  
);
export const getsolde = async (id_e) => (
    await instance.get( `employee/getsolde/${id_e}`)  
);

export const updateemployeeinfo= async (id_e,Fname,Lname,Email) => (
    // await instance.put('/employee/active/${id_e}')
     await instance.put(`/employee/updateinfo/${id_e}`,{Fname,Lname,Email})
 )
