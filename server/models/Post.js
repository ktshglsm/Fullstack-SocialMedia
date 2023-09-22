module.exports = (sequelize, DataTypes) =>
    sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        desc: {
            type: DataTypes.STRING,
        },
        img: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },



    });


