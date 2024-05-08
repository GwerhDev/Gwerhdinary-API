const router = require('express').Router();

const credential = require('./management-credential');
const audio = require('./management-audio');

router.use("/credential", credential);
router.use("/a", audio);

module.exports = router;