const Sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) =>{
  const association= sequelize.define('association', {
    id_a: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      desgination: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      adresse: {
        type: Sequelize.STRING(50),
        allowNull: false
      },

      email: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description	:{
          type:Sequelize.TEXT,
          allowNull:false
         },
      Tel: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
    }, {
      sequelize,
      tableName: 'association',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id_a" },
          ]
        },
      ]

  });
  return association;
}