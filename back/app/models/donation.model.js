const Sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) =>{
  const donation= sequelize.define('donation', {
    id_d: {
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
        type: Sequelize.TEXT,
        allowNull: false
      },
      react: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type_transaction:{
        type: Sequelize.TEXT,
        allowNull: false
      },
      date_d:{
        type: Sequelize.DATE,
        allowNull: false
      },
      id_e: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employee',
          key: 'id_e'
        }
      },
      id_a: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'association',
          key: 'id_a'
        }
      }
    }, {
      sequelize,
      tableName: 'donation',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id_d" },
          ]
        },
        {
          name: "id_e",
          using: "BTREE",
          fields: [
            { name: "id_e" },
          ]
        },
        {
          name: "id_a",
          using: "BTREE",
          fields: [
            { name: "id_a" },
          ]
        },
        {
          name: "id_e_2",
          using: "BTREE",
          fields: [
            { name: "id_e" },
          ]
        },
        {
          name: "id_a_2",
          using: "BTREE",
          fields: [
            { name: "id_a" },
          ]
        },
      ]
  });
  return donation;
}