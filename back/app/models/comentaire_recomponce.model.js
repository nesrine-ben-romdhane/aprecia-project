const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize) {
    const comentaire_recomponce= sequelize.define('comentaire_recomponce', {
 
    id_c: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    comentaire: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    reactNombre:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_r: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'recomponses',
        key: 'id_r'
      }
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
    tableName: 'comentaire_recomponce',
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
        name: "recomponce",
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
    ]
  });
  return comentaire_recomponce;
};
