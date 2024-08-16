const router = require('express').Router();
// const client = require('../client');

// //Contentful API call to get header data
// router.get("/header", async (req, res) => {
//   try {
//     client.getEntry('6XUutdHUV0NVTJAW556r2R', { include: 3 })
//     .then((entry) => {
//       res.json(entry)
//     })
//     .catch((err) => console.log(err))
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;