module.exports = (sequelize, DataTypes) =>
    sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coverPic: {
            type: DataTypes.STRING,
        },
        profilePic: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        website: {
            type: DataTypes.STRING,
        },

    });


