const db = require("../models");
const employeeModel = db.employee;
const recomponsesModel = db.recomponses;
const responsableModel = db.responsable;
const transformationModel =db.transformation;
const carte_voyageModel=db.carte_voyage;
const carte_resteauModel=db.carte_resteau;
const historique_points=db.historique_points;
const nodemailer = require('nodemailer');
const {smtpConf} = require('../config/config');
const bcrypt = require('bcrypt');


const Op = db.Sequelize.Op;

const { employee } = require("../models");
const { response } = require("express");

  const imageuser='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';



exports.getAllHistoriqueList=(req,res)=>{
 // Validate request
//  if (!req.body) {
//   res.status(400).send({
//     message: "Content can not be empty!",
//   });

// }
const historiqueList=historique_points
.findAll({
  where: { id_e: req.params.id_e },
  order: [
    ['date_hp', 'DESC'],
],
}).then(rep=>{
  res.status(200).send({
    message: rep,
  });
}).catch(err=>{
  res.status(500).send({
    message:"historiqueList error ",
  });
})

}
///////////////////////////////////////////////////////////////////////////////
exports.getAllechange=(req,res)=>{

 const historiqueechange=recomponsesModel.findAll({
   where: { id_e: req.params.id_e },
   include:[{
    model:employeeModel,
    as: 'id_e_r_employee',
  
 }],
   order: [
     ['date_attribuation', 'DESC'],
 ],
 }).then(rep=>{
   res.status(200).send({
     message: rep,
   });
 }).catch(err=>{
   res.status(500).send({
     message:"historique echange error ",
   });
 })
 
}

// Create and Save a new employee

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(200).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //tester email employer exist ou nn
  const employeelist = employeeModel
    .findAll({
      where: { email: req.body.email },
    })
    .then((data) => {
      if (data) {
        console.log("******************* emails exist" + JSON.stringify(data));
        if (data.length == 0) {
          console.log(
            "////////////////// employee values" + JSON.stringify(req.body)
          );
          //creation d employee
          responsableModel
            .findAll({
              where: {
                email: req.body.Emailresponsable,
              },
            })
            .then(function (list) {
              console.log(
                "reposnable details with emailsent is " +
                  JSON.stringify(list[0])
              );
              console.log("**************id r "+JSON.stringify(list));
              var id_re=0;
              if(JSON.stringify(list).length>2){
                id_re=list[0].id_r;

              }
           
              if(id_re!=0){
                const hashpassword = bcrypt.hashSync(req.body.password, 5);
                console.log("**************hased password "+hashpassword)
                   // Create emlpoyee
              const employee = {
                nom: req.body.firstname,
                prenom: req.body.lastname,
                email: req.body.email,
                password: hashpassword,
                grade: req.body.grade,
                nbr_point: 0,
                solde_argent: 0,
                image:imageuser,
                id_r: id_re,
                isActive:false
                
              };
                employeeModel
                .create(employee)
                .then((data) => {

                  const transporter = nodemailer.createTransport(smtpConf);

                  // don't send emails if it is in demo mode
         
                  // send mail with defined transport object
                    transporter.sendMail({
                      from: '"Aprecia" <'  + '>',
                      to: req.body.Emailresponsable, // list of receivers
                      subject: 'Aprecia Account Apps', // Subject line
                      // eslint-disable-next-line max-len
                      html: '<h1>Hi Sir </h1><br><p> '+employee.nom+' '+employee.prenom    +' made an account while he waited '+'<br>'+ 'Confirm  his  account  please</p>', // html body
                    });
                    console.log("***************** success creating employee")
                  res.send({message:data});
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while creating the employee",
                  });
                });
              }else{
                res.status(500).send({
                    message:
                    
                      "email responsable does not exist ",
                  });
              }
          
            });
        } else {
            console.log("Exist email of employee")

          res.status(500).send({
            message: "Exist email of employee ",
          });
        }
      }
    })
    .catch((err) => {
      console.log("***************err is " + JSON.stringify(err));
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee",
      });
    });

  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
};


///////////////////////////////////////////////////////////////////////////////////////


exports.login_employee = (req, res) => {
  console.log("******************auth employee ")

   employeeModel.findOne({ where: {
    
      email: req.body.email ,
       isActive:true

  
  } })  .then((data) => {
    if (data) {

    if(bcrypt.compareSync(req.body.password,data.password)){

      return res.json({
        success: data})
    }else{

      return res.json({success: false, msg: ' password does not exist'});

    }
      
   }else{
    console.log("**************no data exsits ")
    return res.json({success: false, msg: 'email and password does not exist'});
   
   }
}).catch((err)=>{
  res.status(500).send({
    message:
      err.message || "Some probleme when authentifcation reposnable  issue",
  });
})

}



// /////////////////////////////////////////////////////////////////////////////////////
async function getEmailemploye(id_e){

  const res= await employeeModel.findOne({where:{id_e:id_e}});;
  console.log("email "+JSON.stringify(res.email));
  const transporter = nodemailer.createTransport(smtpConf);
  
  // send mail with defined transport object
  transporter.sendMail({
    from: '"Aprecia" <'  + '>',
    to: res.email, // list of receivers
    subject: 'Aprecia Account Apps', // Subject line
    // eslint-disable-next-line max-len
    html: '<h1>Hello '+res.nom   +'     ' + res.prenom+'</h1><br><p> '+' Your manager validated your account '+ ' </p> '
  });
  
  }

exports.updateState=(req,res)=>{
  employeeModel.update(
    { isActive: true },
    { where: { id_e:req.params.id_e } }
  ).then((data)=>{
    res.send({message:"sucess update state account employee"});
    getEmailemploye(req.params.id_e );

  }

  ).catch((err)=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the respnsable.",
    });
  })
}
////////////////////////////////////////////////////////////////////////////////////
async function getEmailemployeadd(email){

  const res= await employeeModel.findOne({where:{email:email}});;
  console.log("email "+JSON.stringify(res.email));
  const transporter = nodemailer.createTransport(smtpConf);
  
  // send mail with defined transport object
  transporter.sendMail({
    from: '"Aprecia" <'  + '>',
    to: res.email, // list of receivers
    subject: 'Aprecia Account Apps', // Subject line
    // eslint-disable-next-line max-len
    html: '<h1>Hello '+res.nom   +'     ' + res.prenom+'</h1><br><p> '+' Your manager has been aded your account'+ ' </p> '
  });
  
  }
exports.addemployee=(req,res)=>{
  
  const hashpassword = bcrypt.hashSync(req.body.password, 5);


  const employee = {
    nom: req.body.firstname,
    prenom: req.body.lastname,
    email: req.body.email,
    password: hashpassword,
    grade: "employee",
    nbr_point: 0,
    solde_argent: 0,
    image:imageuser,
    id_r: req.body.id_r,
    isActive:true
   };
    employeeModel
    .create(employee)
    .then((data) => {

        console.log("***************** success creating employee")
      res.send({message:data});
      getEmailemployeadd( req.body.email);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the employee",
      });
    });
  }
  






///////////////////////////////////////////////////////////////////
exports.gelAll = (req, res) => {
  // afficher toute les employee
  employeeModel
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
//////////////////suprimer un employee///////////////////////////////////////////////////
exports.delete_employee = (req, res) => {
    const id = req.params.id_e;
  
    employeeModel.destroy({
      where: { id_e: id }
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
/////////////////////////////////////////////////////////////////////////////////////////

exports.AllemployeeInMyDepartment = (req, res) => {
  console.log("********************* AllemployeeInMyDepartment *******  id e "+req.params.id_e);
  employeeModel.findAll({ where: {
   id_r:req.params.id_r,
   id_e: {[Op.ne]:req.params.id_e}
        } 
      }
        )
  .then(data => {
    return res.json({ success: true ,data})
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the employee."
    });
  });
};

// aysnc update function
async function getResponsableInfo(id_rv,nbr_point,nomE,prenomE,nomR,prenomR,date_attribuation) {
    const resp= await responsableModel.findOne({where:{id_r:id_rv}});
    const transporter = nodemailer.createTransport(smtpConf);

    // send mail with defined transport object
      transporter.sendMail({
        from: '"Aprecia" <'  + '>',
        to: resp.email, // list of receivers
        subject: 'Aprecia Account Apps', // Subject line
        // eslint-disable-next-line max-len
        html: '<h1>Hello'+resp.nom   +' ' + resp.prenom+' </h1><br><p> '+' Your have new  rewards added which contain   '+nbr_point+' points  sent at  '+date_attribuation+ ' to '+nomR+ '   '+prenomR +  ' from '+nomE+'  '+prenomE+'  :)'
      });
   //console.log("*************** resposanble"+JSON.stringify(resp));
      return resp;
}



exports.TopFiveEmployeeRecord=(req,res)=>{
        employeeModel.findAll({
          order: [
            ['nbr_point', 'DESC']          
          ],
          attributes: {
            exclude: [
              'grade',
              'password',
              'isActive',
              'email',
              'id_e',
              'grade',
              'id_r',
              'solde_argent'



            
            ]
          } ,
          limit: 5
        }).then(rep=>{
          res.json({ success: true ,rep})
        })
         .catch(err=>{
             res.status(500).send({
             message:err.message || "Some error occurred while TopFiveEmployeeRecord."
          });
   })

}
//////////////////////////////////////////////////////////////////////////////////////////


exports.RewardPointToOtheEmployee = (req, res) => {
  console.log("********************* body RewardPoint"+JSON.stringify(req.body));

 getResponsableInfo(req.body.id_r,req.body.nbr_point,req.body.nomE,req.body.prenomE,req.body.nomR,req.body.prenomR,new Date());
    const Recomponses={
      "date_attribuation": new Date(),
      "nbr_point": req.body.nbr_point,
      "status": 0,
      "types_recomponses": "envoi",
      "commentaire": "   ",
      "react": 0,
      "id_e": req.body.id_e,
      "id_e_r": req.body.id_er
    }

      recomponsesModel.create(Recomponses).then(reponse=>{
        res.json({ success: true ,reponse})
      })
          .catch(err=>{
            res.status(500).send({
            message:err.message || "Some error occurred while RewardPoint."
            });
 })
  
};


/////////////////////////////////////////////////////////////////////////////////////////

//changeMoneyEmployee ===> functions


async function saveChangeTransformationMoney(nbr_point,id_e,montant) {
  const transformationdata=await transformationModel.create({
    nbr_point	:nbr_point,
    montant:montant,
    date_t:new Date(),
    status:false,
    id_e:id_e
  })
  console.log("************* transformationdata"+JSON.stringify(transformationdata));


}
async function getEmailManagerById(id_r,nbr_point,nomE,prenomE){

const res= await responsableModel.findOne({where:{id_r:id_r}});;
console.log("email "+JSON.stringify(res.email));
const transporter = nodemailer.createTransport(smtpConf);

// send mail with defined transport object
transporter.sendMail({
  from: '"Aprecia" <'  + '>',
  to: res.email, // list of receivers
  subject: 'Aprecia Account Apps', // Subject line
  // eslint-disable-next-line max-len
  html: '<h1>Hello </h1><br><p> '+res.nom   +'     ' + res.prenom+' You have a new change of '+nbr_point+' money points  '+ ' from '+nomE+ '   '+prenomE +  ' You can validate '+'<br> thank you  :)'
});

}

exports.changeMoneyEmployee=(req,res)=>{
console.log("****************** changeMoneyEmployee ");
if(!req.body){
  res.status(500).send({
    message:" changeMoneyEmployee no sended data to this method "
  });
}
else{
console.log("************entred in methid");
var montant =req.body.nbr_point/10;
saveChangeTransformationMoney(Number(req.body.nbr_point),req.params.id_e,montant);
console.log("*********** montant ==>"+montant);
getEmailManagerById(req.body.id_r,req.body.nbr_point,req.body.nom,req.body.prenom );

  res.send({message:"sucess transformation"});

}
}

////////////////////////////////////////////////////////////////////////////////////
exports.getAlltransformationNotActive = (req, res) => {

  transformationModel.findAll(
    {
      where:
        {
        status:0,
        },
        include:[{
            model:employeeModel,
            as: 'id_e_employee',
            where:
              {
                isActive:true,
                 id_r:req.params.id_r
            },
        },
      ] }
    ).then(data => {
      const transformationlist =JSON.parse(JSON.stringify(data));
     // console.log(Object.entries(listEmplooyee));
        return res.json({ success: true ,transformationlist})
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while transformation."
        });
      })
    }



/////////////////////////////////////////////////////////////////////////////////////////



async function updatetransformation(id_t,nomR,prenomR){
 
  const transformation =await transformationModel.findOne({where:{id_t:id_t}});
  console.log("/////transformation",transformation)
  const employee=await employeeModel.findOne({where:{id_e:transformation.id_e}});
  var soldeupdated=0;
  var nbr_pointupdate=0;
  let nbr_pointemploye=employee.nbr_point;
  let nbr_pointtransfert=transformation.nbr_point;

    let soldeemployee=employee.solde_argent;
    let soldetransferer =transformation.montant
    soldeupdated= soldeemployee + soldetransferer
    nbr_pointupdate=nbr_pointemploye - nbr_pointtransfert
    // console.log("//////////soldeupdated",soldeupdated)
    employee.update(
      { solde_argent: soldeupdated,
        nbr_point: nbr_pointupdate
       },
      // { where: { id_e:id_E } }
    )
    const transporter = nodemailer.createTransport(smtpConf);
  
  // send mail with defined transport object
  transporter.sendMail({
    from: '"Aprecia" <'  + '>',
    to:employee.email, // list of receivers
    subject: 'Aprecia Account Apps', // Subject line
    // eslint-disable-next-line max-len
    html: '<h1> Hello  ' + employee.nom   +'  ' + employee.prenom + '</h1><br><p>'+ ' Your Transformation has bin validated by your manager '+ nomR + prenomR + '<br> thank you  :)'
  });
  

}


exports.transformationMoney=(req,res)=>{
  transformationModel.update(
    {status:1},
    { where: { id_t:req.params.id_t } }

  ).then((data)=>{
    updatetransformation(req.params.id_t,req.body.nomR,req.body.prenomR)
    res.send({
      message: "transformation has bin validate!"
  })}).catch((err)=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the respnsable.",
    });
  })

}

////////////////////////////////////////////////////////////////////////

exports.delete_transformation = (req, res) => {
  const id = req.params.id_t;

  transformationModel.destroy({
    where: { id_t: id }
  })
    .then(
        res.send({
          message: "transformation was deleted successfully!"
    }))
  .catch(err => {
      res.status(500).send({
        message: "Could not delete transformation with id=" + id
      });
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////


async function sendEmail(id_r,nbr_point,typeoperation,nomE,prenomE){
  console.log("//////////////////send email",id_r,nbr_point,typeoperation,nomE,prenomE)

  const res= await responsableModel.findOne({where:{id_r:id_r}});;
  console.log("email "+JSON.stringify(res.email));
  const transporter = nodemailer.createTransport(smtpConf);
  
  // send mail with defined transport object
  transporter.sendMail({
    from: '"Aprecia" <'  + '>',
    to: res.email, // list of receivers
    subject: 'Aprecia Account Apps', // Subject line
    // eslint-disable-next-line max-len
    html: '<h1>Hello </h1><br><p> '+res.nom   +'     ' + res.prenom+' You have a new change to '+typeoperation+'of value '+nbr_point+' points  '+ ' from '+nomE+ '   '+prenomE +  ' You can validate '+'<br> thank you  :)'
  });
  
  }
async function savecartevoyage(nbr_point,desc,id_e) {
  const createCartevoyage=await carte_voyageModel.create({
    nbr_point	:nbr_point,
    reduction:40,
    description:desc,
    date_debut:new Date(),
    date_fin:new Date(),
    date_cv:new Date(),
    status:false,
    disponiblite:false,
    id_e:id_e
  })
  console.log("************* savecartevoyage"+JSON.stringify(createCartevoyage));


}
async function savecarteresteau(nbr_point,desc,id_e) {
  var nbr_ticket= nbr_point/50
   const createCarteresteau=await carte_resteauModel.create({
     description	:desc,
     nbr_point:nbr_point,
     nbr_ticket:nbr_ticket,
     valeur_ticket:4,
     date_cr:new Date(),
     status:false,
     disponiblite:false,
     id_e:id_e
   })
   console.log("************* createCarteresto "+JSON.stringify(createCarteresteau));
 
 }
  
  exports.cartecadeaux=(req,res)=>{
  console.log("****************** changeMoneyEmployee ");
  if(!req.body){
    res.status(500).send({
      message:" carte cadeaux de Employee no sended data to this method "
    });
  }
  else{
  console.log("************entred in methid");
  if(req.body.typeoperation=="carte_resto"){
  savecarteresteau(req.body.nbr_point,req.body.desc,req.body.id_e);
  sendEmail(req.body.id_r,req.body.nbr_point,req.body.nomE,req.body.prenomE)
  
  }
  else{
    savecartevoyage(req.body.nbr_point,req.body.desc,req.body.id_e,)
    sendEmail(req.body.id_r,req.body.nbr_point,req.body.typeoperation,req.body.nomE,req.body.prenomE)
    
  }
  
  // getEmailManagerById(req.body.id_r,req.body.nbr_point,req.body.nom,req.body.prenom );
  
    res.send({message:"sucess cartecadeaux"});

  
  }
}
exports.getsolde=(req,res)=>{
  employeeModel.findOne({ where: {
    id_e:req.params.id_e,
  },
  attributes: {
    exclude: [
      'grade',
      'password',
      'isActive',
     'image',
      'id_r',
  
    ]
  } ,
       }
         )
   .then(data => {
     return res.json({ success: true ,data})
   })

}





exports.updateemployeeinfo=(req,res)=>{
  employeeModel.update(
    { nom: req.body.Fname,
      prenom: req.body.Lname ,
      email : req.body.Email
     },
    { where: { id_e:req.params.id_e } }
  ).then((data)=>{
    res.send({message:"sucess update  account employee"});
  }

  ).catch((err)=>{
    res.status(500).send({
      message:
        err.message || "Some error to update.",
    });
  })
}









