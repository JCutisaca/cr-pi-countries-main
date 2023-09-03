const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define("Activity", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dificultad: {
            type: DataTypes.STRING
        },
        duracion: {
            type: DataTypes.STRING
        },
        temporada: {
            type: DataTypes.ARRAY(DataTypes.ENUM("Summer", "Fall", "Winter", "Spring")),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}