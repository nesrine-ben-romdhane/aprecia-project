module.exports = app => {
    const association = require("../controllers/association.controller");
  
    var router = require("express").Router();
     router.get("/list_association/",association.listassociation);
     router.post("/donation/:id_e",association.donation_association);
     router.get("/all_donation/:id_r",association.getAlldonationNotactive);
     router.put("/activdonation/:id_d",association.updatedonationstatus);
     router.delete("/delete/:id_d",association.delete_donation);
    



     app.use('/api/association', router);
}