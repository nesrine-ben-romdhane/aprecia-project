const db = require("../models");

const association =db.association;
const donationModel= db.donation;
const responsableModel=db.responsable;
const emlpoyeeModel=db.employee;
const nodemailer = require('nodemailer');
const {smtpConf} = require('../config/config');
const associationModel = require("../models/association.model");
const Op = db.Sequelize.Op;

exports.listassociation = (req, res) => {
    // afficher toute les employee
    association 
      .findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the respnsable.",
        });
      });
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////
async function savedonationMoney(montant,typetransaction,id_a,id_e) {
  const donation=await donationModel.create({
    monnaie	:montant,
    status:false,
    type_transaction:typetransaction,
    react:0,
    commentaire:"",
    date_d:new Date(),
    id_a:id_a,
    id_e:id_e
  })
  console.log("************* donation"+JSON.stringify(donation));


}


async function getEmailManagerById(id_r,id_a,montant,nomE,prenomE){

  const res= await responsableModel.findOne({where:{id_r:id_r}});
  const resp= await association.findOne({where:{id_a:id_a}});
  console.log("*****************res ",res)
  // console.log("email "+JSON.stringify(res.email));
  const transporter = nodemailer.createTransport(smtpConf);
  // send mail with defined transport object
  transporter.sendMail({
    from: '"Aprecia" <'  + '>',
    to: res.email, // list of receivers
    subject: 'Aprecia Account Apps', // Subject line
    // eslint-disable-next-line max-len
    html: '<h1>Hello '+ res.nom   +'     ' + res.prenom +'</h1><br><p></p>'+ ' You have a new donation of '+ montant +' dinars  '+ ' from '+  nomE+ '   '+prenomE +'to '+resp.desgination  +' You can validate '+'<br> thank you  :)'
  });
  
  }
exports.donation_association=(req,res)=>{
  
  if(!req.body){
    res.status(500).send({
      message:" donation no sended data to this method "
    });
  }
  else{
    console.log("data info "+JSON.stringify(req.body));
    // if(req.body.nbr_point){
    //   console.log("***********nbr point "+req.body.nbr_point);
    // }
 
  savedonationMoney(req.body.montant,req.body.typetransaction,req.body.id_a,req.params.id_e);
 
  //getEmailManagerById(req.body.id_r,req.body.id_a,req.body.montant,req.body.nom,req.body.prenom );
  
    res.send({message:"sucess transformation"});
  
  }
  }
//////////////////////////////////////////////////////////////////////////////////////////


exports.getAlldonationNotactive = (req, res) => {

  donationModel.findAll(
 

    {
      where:
        {
        status:0,
        },
        
        include:[{
            model:emlpoyeeModel,
            as: 'id_e_employee',
            where:
              {
                isActive:true,
                 id_r:req.params.id_r
            },
            attributes: {
              exclude: [
                
              ]
            } ,
           

        },
        {
          model:association,
          as: 'id_a_association'
        }
      ]
     
      }

    ).then(data => {
      const donationlist =JSON.parse(JSON.stringify(data));
     // console.log(Object.entries(listEmplooyee));
        return res.json({ success: true ,donationlist})
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while donation."
        });
      })
    }

/////////////////////////////////////////////////////////// update status donation////////

async function sendemail(id_e,id_a,nomR,prenomR){

  const employee= await emlpoyeeModel.findOne({where:{id_e:id_e}});
  const associationlist= await association.findOne({where:{id_a:id_a}});

  // console.log("email "+JSON.stringify(employee.email));
  const transporter = nodemailer.createTransport(smtpConf);
  
  // send mail with defined transport object
  transporter.sendMail({
    from: '"Aprecia" <'  + '>',
    to: employee.email, // list of receivers
    subject: 'Aprecia Account Apps', // Subject line
    // eslint-disable-next-line max-len
    html: '<h1> Hello  ' + employee.nom   +'  ' + employee.prenom + '</h1><br><p>'+ ' Your Donation has bin validated by your manager '+ nomR + prenomR + ' to  '+ associationlist.desgination + '<br> thank you  :)'
  });

  transporter.sendMail({
    from: '"Aprecia" <'  + '>',
    to: associationlist.email, // list of receivers
    subject: 'Aprecia Account Apps', // Subject line
    // eslint-disable-next-line max-len
    html: '<h1> Hello  '+ association.desgination	   + '</h1><br><p>' + ' Your have a donation from '+ employee.nom + employee.prenom + ' you can contact the administration of Aprecia  '+ '<br> thank you  :)'
  });
  
}





async function updateDonnation(id_d){
    const donnation=await donationModel.findOne({where:{id_d:id_d}});
    const employee=await emlpoyeeModel.findOne({where:{id_e:donnation.id_e}});
    // const association=await associationModel.findOne({where:{id_a:id_a}});
  var soldeupdated=0;
  var pointupdataed=0;
  // console.log("//////////////////type de transaction",donnation.type_transaction)

    if(donnation.type_transaction=='solde'){
      let soldeemployee=employee.solde_argent;
      let danation_solde=donnation.monnaie
      soldeupdated= soldeemployee - danation_solde
      // console.log("//////////soldeupdated",soldeupdated)
      employee.update(
        { solde_argent: soldeupdated },
        // { where: { id_e:id_E } }
      )


    }else{
       let pointdonation= donnation.monnaie * 10 ;
      let nbrpointemployee=employee.nbr_point;
      pointupdataed = nbrpointemployee - pointdonation
      employee.update(
        { nbr_point:   pointupdataed },
        // { where: { id_e:id_E } }
      )
    }
  
}

exports.updatedonationstatus=(req,res)=>{

  donationModel.update(
    { status: 1,},
    { where: { id_d:req.params.id_d } },
    
  ).then((data)=>{
  //  console.log("//////information",req.params.id_d,req.body.id_e,req.body.id_a)
    updateDonnation(req.params.id_d)
    sendemail(req.body.id_e,req.body.id_a,req.body.nomR,req.body.prenomR)
    res.send({message:"sucess update state account employee"});
  }

  ).catch((err)=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the respnsable.",
    });
  })
}
////////////////////////////////////////////////////////////////////////////////////
exports.delete_donation = (req, res) => {
  const id = req.params.id_d;

  donationModel.destroy({
    where: { id_d: id }
  })
    .then(
        res.send({
          message: "employee was deleted successfully!"
    }))
  .catch(err => {
      res.status(500).send({
        message: "Could not delete employee with id=" + id
      });
    });
};


//////////////////////////////////////////////////////////////////////////////////






       
