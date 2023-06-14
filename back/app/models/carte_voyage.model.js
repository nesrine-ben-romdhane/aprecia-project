const Sequelize = require('sequelize');

   
module.exports = function(sequelize, Sequelize) {
    const carte_voyage= sequelize.define('carte_voyage', {

    id_v: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    date_debut: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    date_fin: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    nbr_point: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    reduction: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    date_cv: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
    disponiblite: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    id_e: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id_e'
      }
    }
  }, {
    sequelize,
    tableName: 'carte_voyage',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_v" },
        ]
      },
      {
        name: "id_e",
        using: "BTREE",
        fields: [
          { name: "id_e" },
        ]
      },
     
    ]
  });
  return carte_voyage;
};
