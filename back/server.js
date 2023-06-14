const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });
  require("./app/routes/admin.route")(app);
  require("./app/routes/reponsable.route")(app);
  require("./app/routes/employer.route")(app);
  require("./app/routes/recomponses.route")(app);
  require("./app/routes/association.route")(app);
  require("./app/routes/dashbord.route")(app);
  
const PORT =3100 || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
