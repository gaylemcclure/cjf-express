const router = require("express").Router();
const client = require("../../client");

//Contentful API call to get landing page data
router.get("/band-applications", async (req, res) => {
  try {
    client
      .getEntries({
        content_type: "generalPage",
        "fields.title[match]": "Band Applications",
        include: 4,
      })
      .then((entry) => {
        res.json(entry);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/volunteer", async (req, res) => {
  try {
    client
      .getEntries({
        content_type: "generalPage",
        "fields.title[match]": "Volunteer",
        include: 10,
      })
      .then((entry) => {
        res.json(entry);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/volunteer-applications", async (req, res) => {
  try {
    client
      .getEntries({ content_type: "cjfLandingPage", include: 10 })
      .then((entry) => {
        res.json(entry);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/volunteer-application-questions", async (req, res) => {
  try {
    client
      .getEntries({
        content_type: "referenceSection",
        "fields.title[match]": "Volunteer Application Form",
        include: 4,
      })
      .then((entry) => {
        res.json(entry);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Contentful API call to get band application form questions
router.get("/band-application-questions", async (req, res) => {
  try {
    client
      .getEntries({
        content_type: "referenceSection",
        "fields.title[match]": "Band Application Form",
        include: 4,
      })
      .then((entry) => {
        res.json(entry);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/member-email", async (req, res) => {
  try {
    client
      .getEntries({
        content_type: "emailTemplate",
        "fields.templateName[match]": "Membership Email to member",
        include: 4,
      })
      .then((entry) => {
        res.json(entry);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.get("/band-image", async (req, res) => {
//   try {
//   client
//     .getSpace(process.env.SPACE_ID)
//     .then((space) => space.getEnvironment("master-2024-08-15"))
//     .then((environment) =>
//       environment.createAsset({
//         fields: {
//           title: {
//             "en-US": "Playsam Streamliner",
//           },
//           description: {
//             "en-US": "Streamliner description",
//           },
//           file: {
//             "en-US": {
//               contentType: "image/jpeg",
//               fileName: "example.jpeg",
//               upload: "https://example.com/example.jpg",
//             },
//           },
//         },
//       })
//     )
//     .then((asset) => asset.processForAllLocales())
//     .then((asset) => console.log(asset))
//     .catch(console.error);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
