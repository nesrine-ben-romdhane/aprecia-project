const Sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) =>{
  const recomponses= sequelize.define('recomponses', {
    id_r: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      date_attribuation: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      nbr_point: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      types_recomponses: {
        type: Sequelize.STRING(50),
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
      },
      id_e_r: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employee',
          key: 'id_e'
        }
      }
    },
    
    
    {
      sequelize,
      tableName: 'recomponses',
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
          name: "id_e",
          using: "BTREE",
          fields: [
            { name: "id_e" },
          ]
        },
        {
          name: "id_e_r",
          using: "BTREE",
          fields: [
            { name: "id_e_r" },
          ]
        },
      ]

  });
  return recomponses;
}