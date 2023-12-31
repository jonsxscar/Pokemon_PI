const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "type",
    {
      id: {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,// creo que en false me crea una tabla llamada types ojo
      freezeTableName: true,
    }
  );
};
