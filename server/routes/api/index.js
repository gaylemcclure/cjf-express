const router = require("express").Router();
const multer = require("multer");
const headerRoute = require("./headerRoutes");
const landingRoute = require("./landingRoute");
const pageRoutes = require("./pageRoutes");
const airtableRoutes = require("./airtableRoutes");
const client = require("../../client");
const contentfulRoutes = require("./contentfulRoutes");
const MailerLite = require("@mailerlite/mailerlite-nodejs").default;
const stripeRoutes = require("./stripeRoutes");
const http = require("https");

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_KEY,
});

router.use("/header", headerRoute);
router.use("/landingPage", landingRoute);
router.use("/page", pageRoutes);
router.use("/airtable", airtableRoutes);
router.use("/contentful", contentfulRoutes);
router.use("/stripe", stripeRoutes);

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

router.post("/add-subscriber", async (req, res) => {
  try {
    const options = {
      method: "POST",
      hostname: "api.emailoctopus.com",
      port: null,
      path: "/lists/a0225cae-90fb-11ef-910e-ef57d8d3bb98/contacts",
      headers: {
        Authorization: "Bearer" + " " + process.env.EMAIL_OCT_API,
        "content-type": "application/json",
      },
    };
    const request = http.request(options, function (result) {
      const chunks = [];

      result.on("data", function (chunk) {
        chunks.push(chunk);
      });

      result.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });

    request.write(
      JSON.stringify({
        email_address: req.body.email,
        tags: ["web"],
        status: "subscribed",
      })
    );
    request.end();
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
