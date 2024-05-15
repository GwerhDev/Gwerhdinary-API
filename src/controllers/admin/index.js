const router = require('express').Router();

const credential = require('./management-credential');

router.use("/credential", credential);

module.exports = router;