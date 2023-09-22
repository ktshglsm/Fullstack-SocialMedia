const moment = require("moment/moment.js");
const { db } = require("../connect.js");
const jwt = require("jsonwebtoken");

const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id)
        LEFT JOIN relationships AS r ON (p.userId = r.followedUser) WHERE r.followerUser = ? OR p.userId = ? ORDER BY p.createdAt DESC`;
        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};
const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const q = "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
        const values = [req.body.desc, req.body.img, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), userInfo.id]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("post has been created");
        });
    });
};

const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const q = "DELETE FROM posts WHERE id=? and userId=?";
        const values = [req.params.postId, userInfo.id]
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.status(200).json("post has been deleted");
            return res.status(403).json('you just only delete your post')
        });
    });
};


module.exports = {
    getPosts, addPost, deletePost
};