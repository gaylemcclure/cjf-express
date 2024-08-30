const router = require("express").Router();
const client = require("../../client");

//Contentful API call to get landing page data
router.get("/", async (req, res) => {
  try {
    client
      .getEntries({
        content_type: "generalPage",
        "fields.title[match]": "Home page",
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

module.exports = router;
