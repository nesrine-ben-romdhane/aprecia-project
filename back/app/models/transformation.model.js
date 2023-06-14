const Sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) =>{
  const transformation= sequelize.define('transformation', {
    id_t: {
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
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    id_e: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transformation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_t" },
        ]
      },
    ]
  });
  return transformation;
};
