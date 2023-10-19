module.exports = (sequelize, DataTypes) =>
    sequelize.define('Notification', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiver: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        conversationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });


