const { DataTypes, UUID } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      image: {
        type: DataTypes.STRING,
      },

      life: {
        type: DataTypes.INTEGER,
      },

      strength: {
        type: DataTypes.INTEGER,
      },

      defense: {
        type: DataTypes.INTEGER,
      },

      speed: {
        type: DataTypes.INTEGER,
      },

      height: {
        type: DataTypes.DECIMAL,
      },

      weight: {
        type: DataTypes.DECIMAL,
      },

      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
