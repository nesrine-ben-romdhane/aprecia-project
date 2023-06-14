const db = require("../models");
const responsableModel = db.responsable;
const employeeModel= db.employee;
const recomponses= db.recomponses;
const Op = db.Sequelize.db;
const nodemailer = require('nodemailer');
const {smtpConf} = require('../config/config');

const {image} = require('../config/configimage');
const { Sequelize } = require("../models");
const recomponsesModel = require("../models/recomponses.model");
const { where } = require("sequelize");


exports.getAllEmployeeRecomponses = (req, res) => {

  employeeModel.findAll(
 

    {
      attributes: {
        exclude: [
          'password',
          'grade',
          'nbr_point',
         
          'solde_argent',
          'isActive',
          'id_r',
        ]
      },where:
        {
        isActive:true,
         id_r:req.params.id_r
        },
               
        include:[{
            model:recomponses,
            as: 'recomponses'
            ,where:{
              status:0
            },
            include:[{
              model:employeeModel,
              as: 'id_e_r_employee',
              attributes: {
                exclude: [
                  'password',
                  'grade',
                  'nbr_point',
                  'solde_argent',
                  'isActive',
                  'id_r',
                ]
              }   
          }]

        }]
        }

    ).then(data => {
      const listEmplooyee=JSON.parse(JSON.stringify(data));
     // console.log(Object.entries(listEmplooyee));
        return res.json({ success: true ,listEmplooyee})
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the respnsable."
        });
      })
    }
  

  //////////////////////////////update status reward////////////
   function afficheMessage(functionName,msg)
    {
      console.log(functionName+"======>:"+msg);
    }

  async function upadteEmployeePointStateAfterRewarding(id_ev,id_e_rv,nbr_pointsRewards) {
   
    console.log("**************nb point rewards"+nbr_pointsRewards);
    const resultpointsEmetteur = await employeeModel.findOne({where:{id_e:id_ev}});
    const resultpointsRecepeteur = await employeeModel.findOne({where:{id_e:id_e_rv}});

    const newPointEmetteur=Number(resultpointsEmetteur.nbr_point)-Number(nbr_pointsRewards);
    const newPointRecepteur=Number(resultpointsRecepeteur.nbr_point)+Number(nbr_pointsRewards);


    const updateEmmetteur=await employeeModel.update({
      nbr_point:newPointEmetteur
    },{
      where:{id_e:id_ev}
    })

    
    const updateRecepteur=await employeeModel.update({
      nbr_point:newPointRecepteur
    },{
      where:{id_e:id_e_rv}
    })
    // afficheMessage("upadteEmployeePointStateAfterRewarding","nbr point Emetteur "+newPointEmetteur
    // +"nb point recepteur"+newPointRecepteur);
    console.log("*emmt point "+Number(resultpointsEmetteur.nbr_point)+" recp point"+Number(resultpointsRecepeteur.nbr_point))
    console.log("*******new point emmeteur"+newPointEmetteur);
    console.log("*******new point emmeteur"+newPointRecepteur);

 }
 


exports.updaterecomponsesStatus=(req,res)=>{

  if(!req.body){
    res.status(500).send({
      message:
        err.message || "No Data sent UpdateRecompnesesStatus",
    });
  }

  recomponses.update(
    { status:1 },
    { where: { id_r:req.params.id_r } }
  ).then(()=>{
    console.log("testinformation //////////////////////////////",JSON.stringify(req.body))
    upadteEmployeePointStateAfterRewarding(req.body.id_e,req.body.id_e_r,req.body.nbr_points);
    //************ create histoqrique recomponses employee */
         const transporter = nodemailer.createTransport(smtpConf);

        // send mail with defined transport object
          transporter.sendMail({
            from: '"Aprecia" <'  + '>',
            to: req.body.EmailE, // list of receivers
            subject: 'Aprecia Account Apps', // Subject line
            // eslint-disable-next-line max-len
            html: '<h1>Hello '+' ' +req.body.nomE   +' ' + req.body.PrenomE+' </h1><br><p> '+ ' points  sent at  '+req.body.date_attribuation+ ' to '+req.body.nomR+ '   '+req.body.PrenomR +  '  has been validated by the manager'+req.body.nom_rsp + req.body.prenom_rsp+  " thank you so much !!!! :)<br>", 
          });

             // send mail with defined transport object
             transporter.sendMail({
              from: '"Aprecia" <'  + '>',
              to: req.body.EmailR, // list of receivers
              subject: 'Aprecia Account Apps', // Subject line
              // eslint-disable-next-line max-len
              html: '<h1>Hello '+ req.body.nomR   +' ' + req.body.PrenomR+ ' </h1><br><p> '+ ' Your received rewards   '+req.body.nbr_points+' points  sent at  '+req.body.date_attribuation+ ' from '+req.body.nomE+ '   '+req.body.PrenomE +  '  has been validated by the manager'+req.body.nom_rsp + req.body.prenom_rsp+  "  you can use it for any purpose you want thank you so much !!!! :)<br>", 
            });


          console.log("***************** success updating  ")
        res.send({message:"success update rewards "});
    }

  ).catch((err)=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the respnsable.",
    });
  })
}


// //////////////////////////////////////////////////////////////// delete rewards ////////////////
exports.delete_rewards = (req, res) => {
  const id = req.params.id_e;

  recomponses.destroy({
    where: { id_r: id }
  })
    .then(
        res.send({
          message: "reward was deleted successfully!"
    }))
  .catch(err => {
      res.status(500).send({
        message: "Could not delete reword with id=" + id
      });
    });
};
/////////////////////////////////////////////////////////////// rewards validate ///////////////////
exports.getAllvalidatrewards = (req, res) => {

  employeeModel.findAll(
 

    {
      attributes: {
        exclude: [
          'password',
          'grade',
          'nbr_point',
         
          'solde_argent',
          'isActive',
          'id_r',
        ]
      },where:
        {
        isActive:true,
         id_r:req.params.id_r
        },
               
        include:[{
            model:recomponses,
            as: 'recomponses'
            ,where:{
              status:1
            },
            include:[{
              model:employeeModel,
              as: 'id_e_r_employee',
              attributes: {
                exclude: [
                  'password',
                  'grade',
                  'nbr_point',
                  'solde_argent',
                  'isActive',
                  'id_r',
                ]
              }   
          }]

        }]
        }

    ).then(data => {
      const listEmplooyee=JSON.parse(JSON.stringify(data));
     // console.log(Object.entries(listEmplooyee));
        return res.json({ success: true ,listEmplooyee})
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the respnsable."
        });
      })
    }

  ////////////////////////////////////////////////////////////////////////////////


  


















//     employeeModel.findAll(
//     // {include: [{model: recomponses  , as: 'id_e_r_recomponses'  }]}
//     // ,{ where: {     
//     //     id_r:req.params.id_r
//     //     ,isActive:true
//     // }
//     // }

//     {where:
//         {
//         isActive:true,
//         id_r:req.params.id_r

//         },
//         include: {
//             model:recomponses,
//             as: 'id_e_r_recomponses'  
//         }
//         }

//     ).then(data => {
//         return res.json({ success: true ,data})
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the respnsable."
//         });
//       });
// }



// ///////////////////////////////////////////////////////////////////////////////////////////////// 
// exports.getAllEmployeeRecomponsesInactive = (req, res) => 
// {

//   employeeModel.findAll(
//     {
//       attributes: {
//         exclude: [
//           'password',
//           'grade',
//           'nbr_point',
//           'email',
//           'solde_argent',
//           'isActive',
//           'image',
//           'id_r',
//           'nom',
//           'prenom'

//         ]
//       },where:
//         {
//         isActive:true,
//         id_r:req.params.id_r

//         },
               
     
//         }

//     ).then(data => {
//       const listIdEmployee=JSON.parse(JSON.stringify(data));
//       let myDataEmployee = [];
//       for(let i=0;i<listIdEmployee.length;i++) {
//         myDataEmployee.push(listIdEmployee[i].id_e);
//       }
//       console.log(myDataEmployee+" type "+typeof(myDataEmployee));

//             recomponses.findAll(
//               {
//                 where: {id_e: {in: [5,6]}}
//             }
//             ).then(data=>{
//               console.log("***********list recomponses "+JSON.stringify(data))
//               return res.json({ success: true ,data})
//             }).catch(err=>{
//               console.log("***********list recomponses err "+JSON.stringify(err))
//             })
//              //console.log(myDataEmployee);
//         return res.json({ success: true ,listIdEmployee})
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the respnsable."
//         });
//       })