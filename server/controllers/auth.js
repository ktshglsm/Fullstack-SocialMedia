const { db } = require("../connect.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const moment = require("moment/moment.js");
const { User } = require("../models");

const register = async (req, res) => {
    const { username } = req.body
    try {
        const user = await User.findOne({ where: { username } })
        if (user) return res.status(409).json("User already exists")
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const newUser = { ...req.body, password: hashedPassword }
        await User.create(newUser)
        return res.status(200).json("User has been created.")

    } catch (error) {
        if (error) return res.status(500).json(error);
    }

}
const login = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ where: { username: username } });
        if (!user) return res.status(404).json("User not found!")
        const checkPassword = bcrypt.compareSync(req.body.password, user.password)
        if (!checkPassword) return res.status(400).json("Wrong password of username!")
        const token = jwt.sign({ id: user.id }, "secretKey");
        const { password, ...other } = user.dataValues;
        res.cookie("accessToken", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60)
        }).status(200).json(other)

    } catch (err) {

        if (err) return res.status(500).json(err);
    }



}
const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out")

}

module.exports = {
    register, login, logout
};