const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continents: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });
};