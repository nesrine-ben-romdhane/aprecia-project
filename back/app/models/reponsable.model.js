const Sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) =>{
  const reponsable= sequelize.define('responsable', {
    id_r: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    prenom: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true

    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    grade: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    image: {
      type: Sequelize.BLOB,
      allowNull: false
    },
   
    id_admin: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'admin',
        key: 'id_admin'
      }
    },
    solde_argent: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    nbr_point: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
   
  }, {
    sequelize,
    tableName: 'responsable',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_r" },
        ]
      },
      {
        name: "id_admin",
        using: "BTREE",
        fields: [
          { name: "id_admin" },
        ]
      },
    ]
  });
  return reponsable;
};