import config from "../config";
import axios from 'axios';



const instance = axios.create({
    baseURL: config.WS_BASE_URL
});



export const listassociation = async () => (
    await instance.get('/association/list_association/')
);
export const donation_association = async (id_e,montant,typetransaction,id_a,id_r,nomE,PrenomE) => (
    await instance.post( `/association/donation/${id_e}`,{montant,typetransaction,id_a,id_r,nomE,PrenomE})
   
);
export const donationlist = async (id_r) => (
    await instance.get( `/association/all_donation/${id_r}`)
   
);
export const updatedonationstatus = async (id_d,id_e,id_a,nomR,prenomR) => (
    await instance.put( `/association/activdonation/${id_d}`,{id_e,id_a,nomR,prenomR})
   
);
export const Deletedonation = async (id_d) => (
  
     await instance.delete(`/association/delete/${id_d}`)
 )