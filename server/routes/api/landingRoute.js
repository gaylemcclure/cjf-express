const router = require('express').Router();
const client = require('../../client');

//Contentful API call to get landing page data
router.get("/", async (req, res) => {
  try {
    client.getEntries({content_type: "cjfLandingPage"}, { include: 100 })
    .then((entry) => {
      console.log(entry.items[0].fields.sections[3].fields.majorSponsors)
      res.json(entry)
    })
    .catch((err) => console.log(err))
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
