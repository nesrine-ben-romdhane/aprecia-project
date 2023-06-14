module.exports = app => {
    const responsableController = require("../controllers/reponsable.controller");
  
    var router = require("express").Router();

  
    // Create a new responsable
    router.post("/", responsableController.create);
    router.post("/login", responsableController.find);
    // router.get("/employee",responsableController.gelAll)
    // Retrieve all responsable not active
    router.get("/employee/:id_r",responsableController.inactiveemployee);
    router.get("/allemployee/:id_r",responsableController.getactiveEmploye);
    router.put("/pointsrewardEmployee/:id_e",responsableController.awredpoints);
    router.get("/TopFiveresponsableRecord",responsableController.TopFiveresponsableeRecord);
    //  // Retrieve a single responsable with id
    //  router.get("/:id", responsableController.findOne);
    //   // Update a responsable with id
    //  router.put("/:id", responsableController.update);
    //  // Delete a responsable with id
    //  router.delete("/:id", responsableController.delete);

    router.get("/allRestaurantcard/:id_r",responsableController.getallCarteResteau);
    router.get("/allTravelCard/:id_r",responsableController.getallCartevoyage);
    router.post("/Restaurantcard/:id_cr",responsableController.activertransformationcardresteau);
    router.post("/travelcard/:id_v",responsableController.activertransformationcardvoyage);
   router.get("/getAllCardsEmployeesByResponsableId/:id_r",responsableController.getAllCardsEmployeesByResponsableId);
   router.get("/getAllCarteVoyagesById_r/:id_r",responsableController.getAllCarteVoyagesById_r);

   router.get("/getAllCarteResteauyId_r/:id_r",responsableController.getAllCarteResteauyId_r);
   router.delete("/deletecarteresto/:id_cr",responsableController.delete_carteresto);
   router.delete("/deletecartevoyage/:id_v",responsableController.delete_cartevoyage);

   
    app.use('/api/responsable', router);

  };
  