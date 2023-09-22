const moment = require("moment/moment.js");
const { db } = require("../connect.js");
const jwt = require("jsonwebtoken");

const getLikes = (req, res) => {

    const q = `SELECT userId FROM likes AS l WHERE l.postId = ? `;
    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.userId));
    });

};

const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
        db.query(q, [[userInfo.id, req.body.postId]], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('like success');
        });
    })

};

const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        const q = `DELETE FROM likes AS l WHERE userId=? AND postId=?`;
        db.query(q, [userInfo.id, req.body.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('dislike success');
        });
    })

};


module.exports = {
    getLikes, addLike, deleteLike
};