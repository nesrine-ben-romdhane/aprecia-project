const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize) {
    const carte_resteau= sequelize.define('carte_resteau', {
 
    id_cr: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    valeur_ticket: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    nbr_ticket: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nbr_point: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    date_cr: {
        type: Sequelize.DATE,
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
    tableName: 'carte_resteau',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cr" },
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
  return carte_resteau;
  
};
