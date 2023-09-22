const express = require("express");
const app = express();
const userRoutes = require("./routes/users.js")
const postRoutes = require("./routes/posts.js")
const likeRoutes = require("./routes/likes.js")
const commentRoutes = require("./routes/comments.js")
const authRoutes = require("./routes/auth.js")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer")
const synonyms = require("synonyms")
const { sequelize } = require("./connect.js")


//middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    next();
})

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", }));


app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/auth", authRoutes)

app.post('/find-related-words', (req, res) => {
    const wordToLookup = req.body.word.toLowerCase();

    // Sử dụng thư viện synonyms để lấy các từ cùng nguồn gốc
    const relatedWords = synonyms(wordToLookup);

    if (relatedWords) {
        // Trích xuất danh sách các từ cùng nguồn gốc loại danh từ (noun)
        const nounWords = relatedWords.noun.split('|');
        res.json(nounWords);
    } else {
        res.status(404).json({ error: 'No related words found' });
    }
});



app.listen(8800, () => {
    console.log('hello');

})