const db = require("../models");
const adminmodel = db.admin;
const Op = db.Sequelize.db;
// Create and Save a new admin

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
     // Create admin
  const admin = {
    nomadmin: req.body.nomadmin,
    prenomadmin: req.body.prenomadmin,
    email: req.body.email,
    password: req.body.password
  };
   // Save admin in the database
   adminmodel.create(admin)
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while creating the Tutorial."
     });
   });
};