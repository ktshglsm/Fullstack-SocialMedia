module.exports = (sequelize, DataTypes) =>
    sequelize.define('Conversation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        secondUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });


