const { db } = require("../connect.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const moment = require("moment/moment.js");
const { User } = require("../models");

const register = async (req, res, next) => {
    const { username } = req.body
    try {
        const user = await User.findOne({ where: { username } })
        if (user) return res.status(409).json("User already exists")
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const newUser = { ...req.body, password: hashedPassword }
        await User.create(newUser)
        return res.status(200).json("User has been created.")

    } catch (err) {
        next(err);
    }

}
const login = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ where: { username: username } });
        if (!user) next({ message: 'user not found!', statusCode: 404 })
        const checkPassword = bcrypt.compareSync(req.body.password, user.password)
        if (!checkPassword) next({ message: 'Wrong password of username!', statusCode: 400 })
        const token = jwt.sign({ id: user.id }, "secretKey");
        const { password, ...other } = user.dataValues;
        res.cookie("accessToken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60)
        }).status(200).json(other)

    } catch (err) {
        next(err);
    }



}
const logout = async (req, res, next) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out")

}

module.exports = {
    register, login, logout
};