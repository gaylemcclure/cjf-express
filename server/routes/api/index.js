const router = require("express").Router();
const headerRoute = require("./headerRoutes");
const landingRoute = require("./landingRoute");
const pageRoutes = require("./pageRoutes");

router.use("/header", headerRoute);
router.use("/landingPage", landingRoute);
router.use("/page", pageRoutes);

module.exports = router;
