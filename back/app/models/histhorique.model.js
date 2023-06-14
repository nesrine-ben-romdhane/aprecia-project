const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize) {
   const historique_points=sequelize.define("historique_points",{
    id_hp: {
      autoIncrement: true,
      type:Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nbr_point: {
      type:Sequelize.INTEGER,
      allowNull: false
    },
    date_hp: {
      type: Sequelize.DATEONLY,
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
    tableName: 'historique_points',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_hp" },
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
        name: "id_e_2",
        using: "BTREE",
        fields: [
          { name: "id_e" },
        ]
      },
    ]
  });
  return historique_points ;
};
