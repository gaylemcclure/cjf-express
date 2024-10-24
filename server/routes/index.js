const router = require("express").Router();
// const homePage = require("./homeRoutes");
const apiRoutes = require("./api");
const postRoutes = require("./postRoutes");

// router.use("/", homePage);
router.use("/api", apiRoutes);
router.use("/imageupload", postRoutes);

module.exports = router;
