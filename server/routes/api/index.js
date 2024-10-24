const router = require("express").Router();
const multer = require("multer");
const headerRoute = require("./headerRoutes");
const landingRoute = require("./landingRoute");
const pageRoutes = require("./pageRoutes");
const airtableRoutes = require("./airtableRoutes");
const client = require("../../client");
const contentfulRoutes = require("./contentfulRoutes");

router.use("/header", headerRoute);
router.use("/landingPage", landingRoute);
router.use("/page", pageRoutes);
router.use("/airtable", airtableRoutes);
router.use("/contentful", contentfulRoutes);

// let upload = multer({ dest: "uploads/" });
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "var/data");
  },
  filename: (req, file, callback) => {
    callback(null, `image.${file.originalname}`);
  },
});

let upload = multer({ storage: imgconfig });

router.post("/image-upload", upload.single("image"), (req, res, next) => {
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
