const db = require("../models");
const emlpoyeeModel=db.employee;
const recomponsesModel = db.recomponses;
const comentaire_recomponce = db.comentaire_recomponce



exports.savecomentaire = (req,res)=> {
    const comentaire={
        date:new Date(),
        comentaire:req.body.coment,
        id_r:req.body.id_r,
        id_e:req.body.id_e ,  
        reactNombre:0
    }
    console.log( comentaire)
    comentaire_recomponce.create( comentaire).then(
      res.json({comentaire})
    )
    .catch(err => {
        res.status(500).send({
          message: "Could not create comentaire"
        });
      });
}

  /////////////////////////////////////////////////////////////////////////

  exports.getAllRecomponses=(req,res)=>{
    recomponsesModel.findAll({
      where:{
        status:1
      },
      order: [
        ['date_attribuation', 'DESC']          
      ],
      include:[{
        model:comentaire_recomponce,
        as: 'comentaire_recomponces',
        include:[{
         
                model:emlpoyeeModel,
                as: 'id_e_employee'
           
        }]
        },
        {
          model:emlpoyeeModel,
           as: 'id_e_employee'
          
        },
        {
          model:emlpoyeeModel,
           as: 'id_e_r_employee'
          
        }
        ]
   
    }).then(data=>
      // res.send({ success: true ,data}) 
      res.json({ success: true ,data})
        // res.send({
        //   message:data
    // })
    )
  .catch(err => {
      res.status(500).send({
        message: "Could not create getAllRecomponses"+JSON.stringify(err)
      });
    });
  }
//   const commentaire= await  comentaire_recomponce.findOne({where:{id_c:id_c} });
//   console.log("*********** commmenatire saisi "+JSON.stringify(commentaire.reactNombre));
//   let nb_r=commentaire.reactNombre;
//   nb_r=nb_r+1;
//   console.log("************** nb r "+nb_r);
//  const result=await  commentaire.update(
//       {
//       reactNombre:nb_r
//      },
//   { where: { id_c:id_c }}
//   )
//      console.log("****************** commentaire update"+JSON.stringify(result.reactNombre));
//      if(result){
     
//         return "success";
//      }
//      return "failed";
/////////////////////////////////////////////////////////////////////////////////////////////////////
async function incermentReactrecompense(id_r,nbrreact){
 const recomponses= await  recomponsesModel.findOne({where:{id_r:id_r} });
    // console.log("*********** commmenatire saisi "+JSON.stringify(commentaire.reactNombre));
    // let nb_r=recomponses.react;
    // nb_r=nb_r+1;
    console.log("************** nb r "+nbrreact);
   const result= await recomponses.update(
        {
        react:nbrreact
       },
    
    )
      
  
}
exports.savejaime = (req,res)=> {
const result= incermentReactrecompense(req.body.id_r,req.body.nbrreact).then(
    res.send({
        message:"success react"}))
        .catch(err => {
            res.status(500).send({
                message: "Could not create savejaime!"
            });
          });
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////

