const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '123456',
    database: 'social',
    logging: false,
});


module.exports = sequelize;
