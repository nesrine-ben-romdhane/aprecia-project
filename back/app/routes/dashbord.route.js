module.exports = app => {
    const comentaire_recomponce = require("../controllers/comentaire_recomponce");
  
    var router = require("express").Router();
     router.post("/createcomentaire",comentaire_recomponce.savecomentaire);
     router.get("/getAllRecomponses",comentaire_recomponce.getAllRecomponses);
     router.post("/saveRecomponsesIncremnt",comentaire_recomponce.savejaime);

     app.use('/api/comentaire', router);
}