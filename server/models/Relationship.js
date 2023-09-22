module.exports = (sequelize, DataTypes) =>
    sequelize.define('Relationship', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        followerUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        followedUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });


