module.exports = app => {
    const recomponsesController = require("../controllers/recomponses.controller");

    var router = require("express").Router();

  
    router.get("/getAllEmployeeRecomponses/:id_r", recomponsesController.getAllEmployeeRecomponses);
    router.get("/rewardsValidate/:id_r", recomponsesController.getAllvalidatrewards);

    router.get("/getAllRecomponsesInactive/:id_r", recomponsesController.getAllEmployeeRecomponses);
    router.put("/updaterewardstatus/:id_r", recomponsesController.updaterecomponsesStatus);
    router.delete("/delete/:id_e",recomponsesController.delete_rewards);

   // router.get("/getAllRecomponsesinfoByIdEmployee/:id_e", recomponsesController.getAllRecomponsesinfoByIdEmployee);
 
    //router.get("/getAllEmployeeRecomponsesInactive/:id_r",recomponsesController.getAllEmployeeRecomponsesInactive);

  
     
    app.use('/api/rewards', router);

  };
  