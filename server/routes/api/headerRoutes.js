const router = require('express').Router();
const client = require('../../client');

//Contentful API call to get header data
router.get("/", async (req, res) => {
  try {
    client.getEntries({content_type: 'navigationHeader'}, { include: 3 })
    .then((entry) => {
      res.json(entry)
    })
    .catch((err) => console.log(err))
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//Contentful API call to get header data
router.get("/footer", async (req, res) => {
  try {
    client.getEntries({content_type: 'footer'}, { include: 3 })
    .then((entry) => {
      res.json(entry)
    })
    .catch((err) => console.log(err))
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});




module.exports = router;
