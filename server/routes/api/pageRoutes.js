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

module.exports = router;
