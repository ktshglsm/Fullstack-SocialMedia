const express = require("express");
const app = express();
const route = require("./routes");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer");
const handleError = require("./middleware/handleError");



//middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    next();
})
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"] }));
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
app.post("/api/upload", upload.single("file"), async (req, res, next) => {
    const file = req.file;
    res.status(200).json(file.filename);
});


route(app);

app.use(handleError);

app.listen(8800, () => {
    console.log('Server listening on');
})