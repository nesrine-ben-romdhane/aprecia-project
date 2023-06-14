const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize) {
    const transformation_resp = sequelize.define('transformation_resp', {
  
    id_tr: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nbr_point: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    montant: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    date_t: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    id_r: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'responsable',
        key: 'id_r'
      }
    }
  }, {
    sequelize,
    tableName: 'transformation_resp',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tr" },
        ]
      },
      {
        name: "id_r_2",
        using: "BTREE",
        fields: [
          { name: "id_r" },
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
        name: "id_r_3",
        using: "BTREE",
        fields: [
          { name: "id_r" },
        ]
      },
    ]
  });
  return transformation_resp;
};
