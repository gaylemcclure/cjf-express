const router = require("express").Router();
// const homePage = require("./homeRoutes");
const apiRoutes = require("./api");

// router.use("/", homePage);
router.use("/api", apiRoutes);

module.exports = router;
