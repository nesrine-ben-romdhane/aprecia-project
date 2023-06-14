const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./admin.model")(sequelize, Sequelize);
db.responsable = require("./reponsable.model")(sequelize, Sequelize);
db.employee = require("./employee.model")(sequelize, Sequelize);
db.recomponses = require("./recomponses.model")(sequelize, Sequelize);
db.donation = require("./donation.model")(sequelize, Sequelize);
db.association = require("./association.model")(sequelize, Sequelize);
db.carte_cadeaux = require("./carte_cadeaux.model")(sequelize, Sequelize);
db.transformation=require("./transformation.model")(sequelize, Sequelize);
db.comentaire_recomponce=require("./comentaire_recomponce.model")(sequelize, Sequelize);
db.carte_resteau=require("./carte_resteau.model")(sequelize, Sequelize);
db.carte_voyage=require("./carte_voyage.model")(sequelize, Sequelize);
db.historique_points=require("./histhorique.model")(sequelize, Sequelize);


db.responsable.belongsTo(db.admin, { as: "id_admin_admin", foreignKey: "id_admin"});
db.admin.hasMany(db.responsable, { as: "responsables", foreignKey: "id_admin"});

db.donation.belongsTo(db.association, { as: "id_a_association", foreignKey: "id_a"});
db.association.hasMany(db.donation, { as: "donations", foreignKey: "id_a"});
db.carte_cadeaux.belongsTo(db.employee, { as: "id_e_employee", foreignKey: "id_e"});
db.employee.hasMany(db.carte_cadeaux, { as: "carte_cadeauxes", foreignKey: "id_e"});
db.donation.belongsTo(db.employee, { as: "id_e_employee", foreignKey: "id_e"});
db.employee.hasMany(db.donation, { as: "donations", foreignKey: "id_e"});

db.recomponses.belongsTo(db.employee, { as: "id_e_employee", foreignKey: "id_e"});
db.recomponses.belongsTo(db.employee, { as: "id_e_r_employee", foreignKey: "id_e_r"});
db.employee.hasMany(db.recomponses, { as: "id_e_r_recomponses", foreignKey: "id_e_r"});
db.historique_points.belongsTo(db.employee, { as: "id_e_employee", foreignKey: "id_e"});
db.employee.hasMany(db.historique_points, { as: "historique_points", foreignKey: "id_e"});

db.carte_resteau.belongsTo(db.employee, { as: "id_e_employee", foreignKey: "id_e"});
db.employee.hasMany(db.carte_resteau, { as: "carte_resteaus", foreignKey: "id_e"});

db.carte_voyage.belongsTo(db.employee, { as: "id_e_employee", foreignKey: "id_e"});
db.employee.hasMany(db.carte_voyage, { as: "carte_voyages", foreignKey: "id_e"});

db.employee.hasMany(db.comentaire_recomponce, { as: "comentaire_recomponces", foreignKey: "id_e"});
db.comentaire_recomponce.belongsTo(db.employee, { as: "id_e_employee", foreignKey: "id_e"});
db.comentaire_recomponce.belongsTo(db.recomponses, { as: "id_r_recomponse", foreignKey: "id_r"});
db.recomponses.hasMany(db.comentaire_recomponce, { as: "comentaire_recomponces", foreignKey: "id_r"});


db.transformation.belongsTo(db.employee, { as: "id_e_employee", foreignKey: "id_e"});
db.employee.hasMany(db.transformation, { as: "transformations", foreignKey: "id_e"});

db.employee.hasMany(db.recomponses, { as: "recomponses", foreignKey: "id_e"});
db.employee.belongsTo(db.responsable, { as: "id_r_responsable", foreignKey: "id_r"});
db.responsable.hasMany(db.employee, { as: "employees", foreignKey: "id_r"});

module.exports = db;