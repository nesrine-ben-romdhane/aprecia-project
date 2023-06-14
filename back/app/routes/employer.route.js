module.exports = app => {
    const employee = require("../controllers/employee.controller");

    var router = require("express").Router();





    router.post("/", employee.create);
    router.post("/login_employee",employee.login_employee)
    router.post("/addemployee",employee.addemployee);
      // Retrieve all employer
    router.get("/all",employee.gelAll);
    router.put("/active/:id_e",employee.updateState);
    router.delete("/delete/:id_e",employee.delete_employee);
    // a traiter front
    router.get("/getAllHistoriqueList/:id_e",employee.getAllHistoriqueList);
        // a traiter front
    router.get("/getAllHistoriqueechange/:id_e",employee.getAllechange);

    router.get("/AllemployeeInMyDepartment/:id_r/:id_e",employee.AllemployeeInMyDepartment);
    router.get("/TopFiveEmployeeRecord",employee.TopFiveEmployeeRecord);
    router.post("/RewardPointToOtheEmployee",employee.RewardPointToOtheEmployee);
    router.post("/changeMoneyEmployee/:id_e",employee.changeMoneyEmployee);

///////////////////////////////////////////////////////////////////////////////////

    router.post("/transformation/:id_t",employee.transformationMoney);
    router.post("/cartecadeaux/",employee.cartecadeaux)
    router.get("/all_transformation/:id_r",employee.getAlltransformationNotActive)
    router.delete("/delete_transformation/:id_t",employee.delete_transformation);
    router.get("/getsolde/:id_e",employee.getsolde)
    router.put("/updateinfo/:id_e",employee.updateemployeeinfo);
////////////////////////////////////////////////////////////////////////////////////////

  
   
    app.use('/api/employee', router);
  };
  