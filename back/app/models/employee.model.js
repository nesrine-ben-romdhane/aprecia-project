const Sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) =>{
  const employee= sequelize.define('employee', {
    id_e: {
        autoIncrement: true,
        type:  Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      nom: {
        type:  Sequelize.STRING(50),
        allowNull: false
      },
      prenom: {
        type:  Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type:  Sequelize.STRING(50),
        allowNull: false
      },
      password: {
        type:  Sequelize.STRING(100),
        allowNull: false
      },
      grade: {
        type:  Sequelize.STRING(50),
        allowNull: false
      },
      nbr_point: {
        type:  Sequelize.INTEGER,
        allowNull: false
      },
      solde_argent: {
        type:  Sequelize.FLOAT,
        allowNull: false
      },
      image: {
        type: Sequelize.BLOB,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      id_r: {
        type:  Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'responsable',
          key: 'id_r'
        }
      }
    },
     {
      sequelize,
      tableName: 'employee',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id_e" },
          ]
        },
        {
          name: "id_admin",
          using: "BTREE",
          fields: [
            { name: "id_r" },
          ]
        },
      ]
  });
  return employee;
}