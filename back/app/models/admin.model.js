module.exports = (sequelize, Sequelize) => {
    const admin = sequelize.define("admin", {
      
   id_admin: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nomadmin: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    prenomadmin: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'admin',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_admin" },
        ]
      },
    ]
  });  
 return admin;
  };