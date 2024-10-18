const router = require("express").Router();
const headerRoute = require("./headerRoutes");
const landingRoute = require("./landingRoute");
const pageRoutes = require("./pageRoutes");
const airtableRoutes = require("./airtableRoutes");

router.use("/header", headerRoute);
router.use("/landingPage", landingRoute);
router.use("/page", pageRoutes);
router.use("/airtable", airtableRoutes);

module.exports = router;
