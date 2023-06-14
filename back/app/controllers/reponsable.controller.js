const db = require("../models");
const responsableModel = db.responsable;
const employeeModel= db.employee;
const Op = db.Sequelize.db;
const carte_voyageModel=db.carte_voyage;
const carte_resteauModel=db.carte_resteau;
const historique_pointModel=db.historique_points;
const nodemailer = require('nodemailer');
const {smtpConf} = require('../config/config');

const bcrypt = require('bcrypt');

const password = 'password123';
const hash = '$2a$10$LNbBC3aNeM4rKFD3goJ9teSb49ktcpTTe6R.g9fEzanbDFbUThuKa';
const saltLength = 10;
const {image} = require('../config/configimage');
const { Sequelize } = require("../models");
//async ya3ni el fonction tnajm tched wa9t
// Create and Save a new admin



// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//       return;
//     }

//     const reposnablelist=responsableModel.findAll(
//       {
       
//         where: { email: req.body.email }
//     }
//     ).then(
//       data=>{
//         if(data){
//           console.log("******************* emails exist"+JSON.stringify(data));
//           if(data.length==0){
//                  // Create responsable
//                                 const responsable = {
//                                     nom: req.body.firstname,
//                                     prenom: req.body.lastname,
//                                     email: req.body.email,
//                                     password: req.body.password,
//                                     grade:req.body.grade,
//                                     id_admin:3
//                                   };
//                                     responsableModel.create(responsable)
//                           .then(data => {
//                             res.send(data);
//                           })
//                           .catch(err => {
//                             res.status(500).send({
//                               message:
//                                 err.message || "Some error occurred while creating the respnsable."
//                             });
//                           });
//           }
//           else{
//             res.status(500).send({
//               message:
//                "Exist email of resposanble "
//             });
//           }
         
//         }
//       }
//     )




// };




// exports.gelAll = (req, res) => {


//    // afficher toute les responsable
//    responsableModel.findAll()
//    .then(data => {
//      res.send(data);
//    })
//    .catch(err => {
//      res.status(500).send({
//        message:
//          err.message || "Some error occurred while creating the respnsable."
//      });
//    });
// };

// // Find a single responsable with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     responsableModel.findByPk(id)
//       .then(data => {
//         if (data) {
//           res.send(data);
//         } else {
//           res.status(404).send({
//             message: `Cannot find responsable with id=${id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving responsable with id=" + id
//         });
//       });
//   };
//   // Update a responsable by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;
  
//     responsableModel.update(req.body, {
//       where: { id_r: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "responsable was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update responsable with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating responsable with id=" + id
//         });
//       });
//   };

  const  imageuser='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';

// Create and Save a new admin

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //tester email responsable exist ou nn
  responsableModel.findAll({
      where: { email: req.body.email },
    })
    .then((data) => {
      if (data) {
        console.log("******************* emails exist" + JSON.stringify(data));
        if (data.length == 0) {
        //  console.log("////////////////// employee values" + JSON.stringify(req.body));
                   // Create emlpoyee
                   const hashpassword = bcrypt.hashSync(req.body.password, 5);
                  //  const p1="hamza";
                  //  const p2='$2b$05$Qd80rL0zKQMKMQWCiNAfFOTBDvtV8NWvQNnIlTHYM1xkISq17//e6';
                  //  console.log("****************************==========> hased pawwsord  "+hash1)
                  //  console.log("****************************==========> comparing  "+bcrypt.compareSync(p1,p2));
              const responsable = {
                nom: req.body.firstname,
                prenom: req.body.lastname,
                email: req.body.email,
                password: hashpassword,
                grade: req.body.grade,
                image:imageuser,
                nbr_point: 0,
                solde_argent: 0,
                id_admin: 3
              };
                responsableModel.create(responsable)
                .then((data) => {
                    console.log("***************** success creating responsableModel")
                  res.send({message:data});
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while creating the responsable",
                  });
                });
          } else{
                res.status(500).send({
                    message:
                    
                      "email responsable does not exist ",
                  });
              }
        }
        //  else {
        //     console.log("Exist email of employee")

        //   res.status(500).send({
        //     message: "Exist email of employee ",
        //   });
        // }
    })
       .catch((err) => {
      console.log("***************err is " + JSON.stringify(err));
      res.status(500).send({
        message:
         "Some error occurred while creating the employee",
      });
    });
  }


  exports.find = (req, res) => {
    console.log("******************auth resposnsable ")



     responsableModel.findOne({ where: {
      
        email: req.body.email 
    
    } })  .then((data) => {
      if (data) {
        //console.log("******************* responsable exist" + JSON.stringify(data));
     
       if(bcrypt.compareSync(req.body.password,data.password)){
          console.log("*********************** right password similar of "+req.body.password);
          return res.json({
            success: data})
       }else{
        return res.json({success: false, msg: 'password does not exist'});

       }
       
        // res.status(200).send({
        //   message:
          
        //     "success authentifcation reposnable  ",
        // });
     }else{
      console.log("**************no data exsits ")
      return res.json({success: false, msg: 'email and apassword does not exist'});
     
     }


  }).catch((err)=>{
    res.status(500).send({
      message:
        err.message || "Some probleme when authentifcation reposnable  issue",
    });
  })

}

exports.inactiveemployee = (req, res) => {
     employeeModel.findAll({ where: {
      isActive:false,
      id_r:req.params.id_r
  } }
  )
     .then(data => {
       return res.json({ success: true ,data})
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the respnsable."
       });
     });
};


// all active employee 
exports.getactiveEmploye = (req, res) => {
  console.log("*************************** id_r   "+req.params.id_r);
  employeeModel.findAll({ where: {
   isActive:true,
   id_r:req.params.id_r
} }
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
////////  points reward
exports.awredpoints=(req,res)=>{
  console.log("***************** nb points "+req.body.nbr_point+" id e "+req.params.id_e);


  employeeModel.findOne({
    where:{id_e:req.params.id_e}
  })
  .then(rep=>{
   // console.log("***** rep "+rep.body.nbr_point);
    var new_points=0;
    new_points=Number(req.body.nbr_point)+Number(rep.nbr_point);
    
    console.log("***** email employee"+rep.email);
    const transporter = nodemailer.createTransport(smtpConf);
    transporter.sendMail({
      from: '"Aprecia" <'  + '>',
      to: rep.email, // list of receivers
      subject: 'Aprecia Account Apps', // Subject line
      // eslint-disable-next-line max-len
      html: '<h1> Congratulations '+rep.nom +' '+ rep.prenom+'</h1><p> ' +' Your manager  rewarded you with  '+req.body.nbr_point+'points</p>'+'<br>'+ '<p>I did Well</p>', // html body
    });
    // console.log("***** nb point table"+rep.nbr_point);
     console.log("********resultat"+new_points);
     historique_pointModel.create({
         nbr_point:req.body.nbr_point,
         date_hp:new Date(),
         id_e:req.params.id_e,


     }).then(rep=>{
            console.log("********resultat historique_pointModel"+rep.body.nbr_point);
          

     }).catch(err=>{
      console.log("********resultat historique_pointModel error"+err);

     })

    employeeModel.update(
      { nbr_point: new_points },
      { where: { id_e:req.params.id_e } }
    ).then((data)=>{
      res.send({message:"sucess"});
    }
  
  
    ).catch((err)=>{
      res.status(500).send({
        message:
          err.message || "Some error occurred while  points reward.",
      });
    })
    }).catch((err)=>{
      res.status(500).send({
        message:
          err.message || "Some error occurred while  points reward.",
      });
    })
 
  }

////////////////////////////////////////////////////////////////
exports.TopFiveresponsableeRecord=(req,res)=>{
  responsableModel.findAll({
    order: [
      ['nbr_point', 'DESC']          
    ],
    attributes: {
      exclude: [
        'grade',
        'password',
        'email',
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

exports.getallCarteResteau = (req, res) => {
  
  carte_resteauModel.findAll(
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
            attributes: {
              exclude: [
                'grade',
                'password',
                'email',
                'grade',
                'id_r',
                'solde_argent',
                'image'
              ]
            } 
        },
      ],
 
    }

)
  .then(data => {
    return res.json({ success: true ,data})
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred resto card"
    });
  });
};

//////////////////////////////////////////////////////////////////////////////////////////
  
exports.getallCartevoyage = (req, res) => {
  
  carte_voyageModel.findAll(
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

)
  .then(data => {
    return res.json({ success: true ,data})
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred resto card"
    });
  });
};

//////////////////////////////////////////////////////////////////////////////////

async function updatetransformationcard(id_cr,nomR,prenomR){
 
  const transformation =await carte_resteauModel.findOne({where:{id_cr:id_cr}});
  console.log("/////transformationcard",transformation)
  const employee=await employeeModel.findOne({where:{id_e:transformation.id_e}});
  var soldeupdated=0;

    let nbrpointemployee=employee.nbr_point;
    let nbr_tronsformer =transformation.nbr_point
    soldeupdated= nbrpointemployee - nbr_tronsformer
    // console.log("//////////soldeupdated",soldeupdated)
    employee.update(
      { nbr_point: soldeupdated },
      // { where: { id_e:id_E } }
    )
    const transporter = nodemailer.createTransport(smtpConf);
  
  // send mail with defined transport object
  transporter.sendMail({
    from: '"Aprecia" <'  + '>',
    to:employee.email, // list of receivers
    subject: 'Aprecia Account Apps', // Subject line
    // eslint-disable-next-line max-len
    html: '<h1> Hello  ' + employee.nom   +'  ' + employee.prenom + '</h1><br><p>'+ ' Your Travel Card has bin validated by your manager '+ nomR + prenomR + '<br> thank you  :)'
  });
  

}

exports.getAllCarteResteauyId_r=(req,res)=>{
  carte_resteauModel.findAll({
    where: {
      status: 0
    },
  
    include: [
      {
        model: employeeModel,
        as: 'id_e_employee',
        where:{
          id_r:req.params.id_r
        },
        attributes: {
          exclude: ['image', 'password']
        }
      }
    ]
  }
  ).then((data)=>{
     
    res.send({
      message: data
  })}).catch((err)=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while c.getAllCarteResteauyId_r"
    });
  })
  
  }


exports.getAllCarteVoyagesById_r=(req,res)=>{
carte_voyageModel.findAll({
  where: {
    status: 0
  },

  include: [
    {
      model: employeeModel,
      as: 'id_e_employee',
      where:{
        id_r:req.params.id_r
      },
      attributes: {
        exclude: ['image', 'password']
      }
    }
  ]
}
).then((data)=>{
   
  res.send({
    message: data
})}).catch((err)=>{
  res.status(500).send({
    message:
      err.message || "Some error occurred while c.getAllCardsEmployeesByResponsableId"
  });
})

}

exports.getAllCardsEmployeesByResponsableId=(req,res)=>{
  employeeModel.findAll({
    where: {
      id_r: req.params.id_r
    },
    include: [
      {
        
        model: carte_voyageModel,
        as: 'carte_voyages',
      
        // where: {
        //   status: 0
        // }
      },
      {
        model: carte_resteauModel,
        as: 'carte_resteaus',
        where: {
          status: 0
        }  
      
      },
    
    ],
    attributes: {
      exclude: ['image', 'password']
    }
  }).then((data)=>{
   
    res.send({
      message: data
  })}).catch((err)=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while c.getAllCardsEmployeesByResponsableId"
    });
  })
}




exports.activertransformationcardresteau=(req,res)=>{
  carte_resteauModel.update(
    {status:1},
    { where: { id_cr:req.params.id_cr } }

  ).then((data)=>{
    updatetransformationcard(req.params.id_cr,req.body.nomR,req.body.prenomR)
    res.send({
      message: "Restaurant card has bin validate!"
  })}).catch((err)=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the respnsable.",
    });
  })

}

/////////////////////////////////////////////////////////////////////////////////////////////
async function updatetransformationcardvoyage(id_v,nomR,prenomR){
 
  const transformation =await carte_voyageModel.findOne({where:{id_v:id_v}});
  console.log("/////transformationcard",transformation)
  const employee=await employeeModel.findOne({where:{id_e:transformation.id_e}});
  var soldeupdated=0;

    let nbrpointemployee=employee.nbr_point;
    let nbr_tronsformer =transformation.nbr_point
    soldeupdated= nbrpointemployee - nbr_tronsformer
    // console.log("//////////soldeupdated",soldeupdated)
    employee.update(
      { nbr_point: soldeupdated },
      // { where: { id_e:id_E } }
    )
    const transporter = nodemailer.createTransport(smtpConf);
  
  // send mail with defined transport object
  transporter.sendMail({
    from: '"Aprecia" <'  + '>',
    to:employee.email, // list of receivers
    subject: 'Aprecia Account Apps', // Subject line
    // eslint-disable-next-line max-len
    html: '<h1> Hello  ' + employee.nom   +'  ' + employee.prenom + '</h1><br><p>'+ ' Your travel card has bin validated by your manager '+ nomR + prenomR + '<br> thank you  :)'
  });
}

exports.activertransformationcardvoyage=(req,res)=>{
  carte_voyageModel.update(
    {status:1,
      date_debut:new Date(),
      date_fin:new Date()
    },
    { where: { id_v:req.params.id_v } }

  ).then((data)=>{
    updatetransformationcardvoyage(req.params.id_v,req.body.nomR,req.body.prenomR)
    res.send({
      message: "travel card has bin validate!"
  })}).catch((err)=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the respnsable.",
    });
  })

}


exports.delete_carteresto = (req, res) => {
  const id = req.params.id_cr;
  carte_resteauModel.destroy({
    where: {id_cr: id }
  })
    .then(
        res.send({
          message: "carte resto was deleted successfully!"
    }))
  .catch(err => {
      res.status(500).send({
        message: "Could not delete carte resto with id="
      });
    });
};



exports.delete_cartevoyage = (req, res) => {
  const id = req.params.id_v;
  carte_voyageModel.destroy({
    where: {id_v: id }
  })
    .then(
        res.send({
          message: "travel card was deleted successfully!"
    }))
  .catch(err => {
      res.status(500).send({
        message: "Could not delete travel card with id="
      });
    });
};




 


