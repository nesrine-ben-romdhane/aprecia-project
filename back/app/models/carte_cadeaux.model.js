const Sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) =>{
  const carte_cadeaux= sequelize.define('carte_cadeaux', {
    
    id_c: {
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
      tableName: 'carte_cadeaux',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id_c" },
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
  return carte_cadeaux ;
}