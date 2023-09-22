const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost', // Thay đổi thành địa chỉ máy chủ MySQL của bạn
    username: 'root', // Thay đổi thành tên người dùng MySQL của bạn
    password: '123456', // Thay đổi thành mật khẩu MySQL của bạn
    database: 'social', // Thay đổi thành tên cơ sở dữ liệu MySQL của bạn
});


module.exports = sequelize;
