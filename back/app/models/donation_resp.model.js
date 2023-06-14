const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize) {
    const donation_resp= sequelize.define('donation_resp', {
  
    id_dr: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    monnaie: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    commentaire: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    react: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type_transaction: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    date_d: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    id_r: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'responsable',
        key: 'id_r'
      }
    },
    id_a: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'association',
        key: 'id_a'
      }
    },
    description: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
  }, {
    sequelize,
    tableName: 'donation_resp',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_dr" },
        ]
      },
      {
        name: "id_r",
        using: "BTREE",
        fields: [
          { name: "id_r" },
        ]
      },
      {
        name: "id_a",
        using: "BTREE",
        fields: [
          { name: "id_a" },
        ]
      },
    ]
  });
  return donation_resp;
};
