const router = require("express").Router();
const multer = require("multer");

// let upload = multer({ dest: "uploads/" });
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image.${file.originalname}`);
  },
});

let upload = multer({ storage: imgconfig });

router.post("/", upload.single("image"), (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
