const router = require('express').Router();
const client = require('../../client');

//Contentful API call to get header data
router.get("/", async (req, res) => {
  try {
    client.getEntries({content_type: "cjfLandingPage"}, { include: 3 })
    .then((entry) => {
      console.log(entry)
      res.json(entry)
    })
    .catch((err) => console.log(err))
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// client.getEntries({
//   content_type: '<content_type_id>',
//   'fields.<field_id>[match]': '<value>'
// })