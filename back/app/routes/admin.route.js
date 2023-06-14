module.exports = app => {
    const admin = require("../controllers/admin.controller");
  
    var router = require("express").Router();
  
    // Create a new admin
    router.post("/", admin.create);
    app.use('/api/admin', router);
  };
  