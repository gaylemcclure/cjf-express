const router = require("express").Router();
const headerRoute = require('./headerRoutes');
const landingRoute = require('./landingRoute')


router.use('/header', headerRoute);
router.use('/landingPage', landingRoute)


module.exports = router;